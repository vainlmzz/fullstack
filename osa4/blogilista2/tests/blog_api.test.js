const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const bcrypt = require('bcryptjs')


const api = supertest(app)


describe('ADDING NEW BLOGS', () => { 

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
  })

  test('blogs are returned/ HTTP Get works', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  //Tee myös testi, joka varmistaa että uuden blogin lisäys ei onnistu, ja pyyntö palauttaa oikean 
  //statuskoodin 401 Unauthorized jos pyynnön mukana ei ole tokenia.

  test('new blogs can be added only by authorized user', async() => {

    // Luodaan testikäyttäjä
    const testUser = {
      username: "testdude",
      name: "Test Dude",
      password: "testing123"
    }

    // Lisätään testikäyttäjä tietokantaan
    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
    
    // kirjaudutaan sisään testkäyttäjällä, jotta saadaan token
    const res2 = await api
      .post('/api/login')
      .send(testUser)
      .expect(200)
    console.log(res2.body.token)

  
    await api
      .post('/api/blogs')
      .send({
        title: "Otsikko",
        author: "kirjottaja",
        url: "testi.fi",
        likes: 7,
      })
      .set('Authorization', `Bearer ${res2.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
      await api
      .post('/api/blogs')
      .send({
        title: "Otsikko",
        author: "kirjottaja",
        url: "testi.fi",
        likes: 7,
      })
      .set('Authorization', ``)
      .expect(401)
      //.expect(result.body.error).toContain('token invalid or missing')

    const res3 = await api.get('/api/blogs')
    console.log(res3.body)
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

    // kirjaudutaan sisään testkäyttäjällä, jotta saadaan token
    const res2 = await api
      .post('/api/login')
      .send({
        username: "testdude",
        password: "testing123"
      })
      .expect(200)
    console.log(res2.body.token)


  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${res2.body.token}`)
      .send({
        title: "Otsikko",
        author: "kirjottaja",
        url: "testi.fi",
        likes: null
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(blog => blog.likes)
    console.log(likes)
    for(let i=0; i < likes.length; i++) { 
      expect(likes[i]).toBeGreaterThanOrEqual(0)
    }

  })
  
  test('A blog must contain title and url', async() => {  

        // kirjaudutaan sisään testkäyttäjällä, jotta saadaan token
        const res2 = await api
        .post('/api/login')
        .send({
          username: "testdude",
          password: "testing123"
        })
        .expect(200)
      console.log(res2.body.token)

  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${res2.body.token}`)
      .send({
        title: "Avoimia Tarinoita",
        author: "Julius Pekkarinen",
        url: "",
        likes: 2
      })
      .expect(400)

    
  })
  
})


describe('DELETING OR UPDATING BLOGS', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
  })


  test('Deleting a blog by authorized user', async() => { 

    // Luodaan testikäyttäjä
    const testUser = {
      username: "testdude",
      name: "Test Dude",
      password: "testing123"
    }

    // Lisätään testikäyttäjä tietokantaan
    await api
      .post('/api/users')
      .send(testUser)
      .expect(201)
    // haetaan kaikki olemassa olevat käyttäjät
    const res = await api
      .get('/api/users')
    console.log(res.body)

    // kirjaudutaan sisään testkäyttäjällä, jotta saadaan token
    const res2 = await api
      .post('/api/login')
      .send(testUser)
      .expect(200)
    console.log(res2.body.token)
   
    
    // lisätään blogi ensin tietokantaan, jotta voidaan poistaa se sieltä
    const res4 = await api
    .post('/api/blogs')
    .send({
        title: "Otsikko",
        author: "kirjottaja",
        url: "testi.fi",
        likes: 7
      })
    .set('Authorization', `Bearer ${res2.body.token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    console.log(res4.body)
    
    await api
      .delete(`/api/blogs/${res4.body.id}`)
      .set('Authorization', `Bearer ${res2.body.token}`)
      .expect(204)

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
      //console.log(blogsAtStart, blogsAtEnd)
    
      expect(blogsAtStart[0].likes).not.toEqual(blogsAtEnd[0].likes)

  })
})


describe('ADDING USERS IS POSSIBLE', () => {
 
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('Creating a new user works', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'pekout',
      name: 'Outi Pekkanen',
      password: 'tämäonhuonosalasana',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log("result",result.body)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'WannabeAdmin',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log(result.body)

    expect(result.body.error).toContain('username already exists, create a unique one')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('A user must have a username that is at least three characters long', async() => {  
    
    const newUser = {
      username: "JP",
      name: "Julius Pekkarinen",
      password: "badpassword"
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
      console.log(result.body)
      expect(result.body.error).toContain('username must exist or be at least three characters')

  })

  test('A user must have a password that is at least three characters long', async() => { 

    const newUser = {
      username: "Julius1334",
      name: "Julius Pekkarinen",
      password: undefined
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
      console.log(result.body)
      expect(result.body.error).toContain('password must exist or be at least three characters')



  }) 

})


afterAll(() => {
  mongoose.connection.close()
})

// {}