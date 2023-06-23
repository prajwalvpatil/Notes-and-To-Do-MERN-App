const express = require('express')

const {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// get all todos
router.get('/', getTodos)

// post a new todo
router.post('/', createTodo)

// delete a todo
router.delete('/:id', deleteTodo)

// update a todo
router.patch('/:id', updateTodo)


module.exports = router