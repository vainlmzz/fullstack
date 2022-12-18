const blogsRouter = require('express').Router()
const { request } = require('../app')
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
  */

  /*
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

    // A blog must contain title and url, if not, it returns bad request
    if((request.body.title === null || request.body.title.length === 0 ) || (request.body.url === null || request.body.url.length === 0))  { 
      response.status(400).json(request.body)
     }


    else  { 
        if(request.body.likes >= 0) {

          const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes
          })
          const addedBlog = await blog.save()
          response.status(201).json(addedBlog)
        
        }

        else {

          const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: 0
          })

          const addedBlog = await blog.save()
          response.status(201).json(addedBlog)

        }
    }
  })


module.exports = blogsRouter