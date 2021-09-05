const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)
  
  const mongoUrl = 'mongodb+srv://fullstack:<SALASANATÄHÄN>@cluster0.4dbqx.mongodb.net/bloglist?retryWrites=true&w=majority'
  mongoose.connect(mongoUrl)
  
  app.use(cors())
  app.use(express.json())

  app.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })



  
  
  app.post('/api/blogs', (request, response) => {
    
    
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    })
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  const PORT = 3003
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


/*
saa post toimimaan että palauttaa 201
ja
mongo url env

*/