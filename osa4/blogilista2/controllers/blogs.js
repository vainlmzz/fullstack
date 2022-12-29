const blogsRouter = require('express').Router()
//const { request } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')


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
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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
  
  /*
  const tokenFromRequest = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    //return null
  }
  */

  blogsRouter.post('/', async (request, response) => {

    //const token = tokenFromRequest(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: "token invalid or missing"})
    }

    const user = request.user // await User.findById(decodedToken.id)

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
            likes: request.body.likes,
            user: user._id
          })
          
          user.blogs = user.blogs.concat(blog._id)
          await user.save()
          const addedBlog = await blog.save()
          response.status(201).json(addedBlog)
        
        }

        else {

          const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: 0,
            user: user._id
          })

          
          user.blogs = user.blogs.concat(blog._id)
          await user.save()
          const addedBlog = await blog.save()
          response.status(201).json(addedBlog)

        }
    }
  })

  blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id
    const blogs = await Blog.find({})
    const blog = blogs.find(blog => blog.id === id)
    response.json(blog)
  })


  blogsRouter.delete('/:id', async (request,response) => {
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // test that verifies the token is valid and exists
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({error: "token invalid or missing"})
    }

    const blog = await Blog.findById(request.params.id)
    console.log("Blog to be deleted",blog)
    
    if (decodedToken.id !== blog.user.toString()){
      return response.status(401).json({error: "This user does not own this blog"})
    }

    if (decodedToken.id === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
    

  })


  blogsRouter.put('/:id', async (request, response) => {
    const newLikes = request.body.likes
    //console.log(request.body)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {"likes": newLikes}, {new: true} )
    //console.log(,updatedBlog)
    response.status(200).json(updatedBlog)
  })


module.exports = blogsRouter