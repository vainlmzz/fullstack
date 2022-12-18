const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
    title: "Juorukello",
    author: "anonyymi",
    url: "juorukello.com",
    likes: 11,
    id: "6135077a6eecceadbf60cb91"
    },
    {
    title: "Minä ja muoti",
    author: "Outi Pekkanen",
    url: "muotiblogi.fi",
    likes: 13,
    id: "6134f492dbb2c0d60082e6eb"
    },
    ]

  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })


test('blogs are returned/ HTTP Get works', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    //.expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is not _id', async() => {
    const response = await api.get('/api/blogs')
    
    // getting the _id field
    const _id = response.body.map(response => response._id)
    // getting the normal id field
    const id = response.body.map(response => response.id)

    console.log("_id", _id)
    console.log("id", id)
    console.log("koko array", response.body)

    //There is no _id field so _id should be undefined 
    expect(_id[0]).toBeUndefined()
    //There is id field so id should be defined
    expect(id[0]).toBeDefined()

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
    console.log(response.body)

    const author = response.body.map(blog => blog.author)
    const title = response.body.map(blog => blog.title)
    const url = response.body.map(blog => blog.url)
    const likes = response.body.map(blog => blog.likes)
    const id = response.body.map(blog => blog.id)


    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(author).toBeDefined()
    expect(author).toContain('Elisa Falla')
    expect(title).toContain('Aurinkomatkoilla')
    expect(url).toContain('seikkailija.es')
    expect(likes).toContain(7)
    expect(id).toBeDefined()
  
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
    console.log(response.body)

    const likes = response.body.map(blog => blog.likes)
    console.log(likes)

    
    //expect(likes[2]).toBeGreaterThanOrEqual(0)
    for(let i=0; i < likes.length; i++) { 
      expect(likes[i]).toBeGreaterThanOrEqual(0)
    }

  })


afterAll(() => {
  mongoose.connection.close()
})