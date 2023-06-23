require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo');
const notesRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');

// Express app initailization
const app = express();

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/todos', todoRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/user', userRoutes)

// DB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // Listening requests
    app.listen(process.env.PORT, () => {
        console.log("DB connected and Listening on port", process.env.PORT)
})
    })
    .catch((error) => {
        console.log(error)
    })