const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


describe('ADDING NEW BLOGS', () => { 

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned/ HTTP Get works', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      //.expect('Content-Type', /application\/json/)
  })


  test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('new blogs can be added', async() => {

    const newBlog = {
      title: "Aurinkomatkoilla",
      author: "Elisa Falla",
      url: "seikkailija.es",
      likes: 7,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    //console.log(response.body)

    const author = response.body.map(blog => blog.author)
    const title = response.body.map(blog => blog.title)
    const url = response.body.map(blog => blog.url)
    const likes = response.body.map(blog => blog.likes)
    const id = response.body.map(blog => blog.id)


    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(author).toBeDefined()
    expect(author).toContain('Elisa Falla')
    expect(title).toContain('Aurinkomatkoilla')
    expect(url).toContain('seikkailija.es')
    expect(likes).toContain(7)
    expect(id).toBeDefined()
  
  })

})



describe('BLOG FORMAT IS CORRECT', () => {
  
  test('id is not _id', async() => {
    const response = await api.get('/api/blogs')
    
    // getting the _id field
    const _id = response.body.map(response => response._id)
    // getting the normal id field
    const id = response.body.map(response => response.id)

    //console.log("_id", _id)
    //console.log("id", id)

    //There is no _id field so _id should be undefined 
    expect(_id[0]).toBeUndefined()
    //There is id field so id should be defined
    expect(id[0]).toBeDefined()

  })

  test('if there are no likes, set it as zero', async() => {  
    
    const newBlog = {
      title: "Hevoset",
      author: "Pekka Airisto",
      url: "hevonen.fi",
      likes: 9
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    //console.log(response.body)

    const likes = response.body.map(blog => blog.likes)
    //console.log(likes)

    
    //expect(likes[2]).toBeGreaterThanOrEqual(0)
    for(let i=0; i < likes.length; i++) { 
      expect(likes[i]).toBeGreaterThanOrEqual(0)
    }

  })
 
  test('A blog must contain title and url', async() => {  
    
    const newBlog = {
      title: "Avoimia Tarinoita",
      author: "Julius Pekkarinen",
      url: "",
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    
  })

})


describe('DELETING OR UPDATING BLOGS', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })


  test('Deleting a blog', async() => { 

    //console.log(helper.initialBlogs)

    const blogsAtStart = await helper.blogsInDB()

    const blogToDelete = blogsAtStart[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      
      const blogsAtEnd = await helper.blogsInDB()
      //console.log(blogsAtEnd)
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(blog => blog.title)

      expect(titles).not.toContain(blogToDelete.title)
    
  })

  test('Updating the likes of a blog', async() => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]
    const newLikes = 2



    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({likes: newLikes})
      .expect(200)
    
      const blogsAtEnd = await helper.blogsInDB()
      console.log(blogsAtStart, blogsAtEnd)
    
      expect(blogsAtStart[0].likes).not.toEqual(blogsAtEnd[0].likes)

  })
})

afterAll(() => {
  mongoose.connection.close()
})

// {}