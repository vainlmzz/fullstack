const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


/*
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)
*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


  /*
  blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })


  blogsRouter.post('/', (request, response) => {

    
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

  */

  blogsRouter.post('/', async (request, response) => {

      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes

      })
 
      const addedBlog = await blog.save()
      response.status(201).json(addedBlog)
    })
    
  


module.exports = blogsRouter