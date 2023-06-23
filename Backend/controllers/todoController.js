const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

// Get all Todos
const getTodos = async (req,res) => {
    const user_id = req.user._id

    const todos = await Todo.find({user_id}).sort({createdAt: -1})

    res.status(200).json(todos)
}

// Create a Todo
const createTodo = async (req,res) => {
    const {title, details} = req.body

    let emptyFields = []
    
    if(!title){
        emptyFields.push('title')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please enter the title', emptyFields})
    }

    // add to db
    try {
        const user_id = req.user._id
        const todo = await Todo.create({title, details, user_id})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a todo
const deleteTodo = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Todo'})
    }

    const todo = await Todo.findByIdAndDelete({_id: id})

    if(!todo) {
        return res.status(400).json({error: 'No such Todo'})
    }

    res.status(200).json(todo)
}

// Update a todo
const updateTodo = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Todo'})
    }

    const todo = await Todo.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!todo) {
        return res.status(400).json({error: 'No such Todo'})
    }

    res.status(200).json(todo)
}

module.exports = {
    getTodos,
    createTodo, 
    deleteTodo,
    updateTodo
}