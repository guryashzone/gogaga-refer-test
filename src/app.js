const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Database
require('./db/mongoose')

// Routers
const viewsRouter = require('./routers/views')
const userRouter = require('./routers/user')

// Set up express static paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const app = express()

// Set up hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)


// Set up static directory to serve
app.use(express.static(publicDirPath))
app.use(express.json())
app.use(viewsRouter)
app.use(userRouter)

module.exports = app