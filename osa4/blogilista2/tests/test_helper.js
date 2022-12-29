const Blog = require('../models/blog')
const User = require('../models/user')


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
  {
  title: "Aurinkomatkoilla",
  author: "Elisa Falla",
  url: "seikkalija.es",
  likes: 7,
  id: "61363d50807fc21b0ce43fd1"
  },
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }

  const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }
  

module.exports = {
    initialBlogs, blogsInDB,usersInDb
 }