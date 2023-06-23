const express = require('express')

const {
    getNotes,
    createNote, 
    deleteNote,
    updateNote
} = require('../controllers/notesController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// get all todos
router.get('/', getNotes)

// post a new todo
router.post('/', createNote)

// delete a todo
router.delete('/:id', deleteNote)

// update a todo
router.patch('/:id', updateNote)


module.exports = router