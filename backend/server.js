const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()
const port = process.env.PORT || 5000

const app = express()

// 1. BODY PARSERS MUST COME FIRST
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(errorHandler)
// 2. ROUTES COME AFTER
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))