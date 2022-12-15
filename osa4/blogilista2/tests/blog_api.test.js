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


afterAll(() => {
  mongoose.connection.close()
})