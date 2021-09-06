const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


logger.info('täällä')

mongoose.connect(config.MONGODB_URI
    , { useNewUrlParser: true, useUnifiedTopology: true })

  

app.use(cors())
app.use(express.json())


app.use('/api/blogs', blogsRouter)

logger.info('täällä2')
  
module.exports = app
  


