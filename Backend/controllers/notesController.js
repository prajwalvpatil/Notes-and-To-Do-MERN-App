const Note = require('../models/notesModel')
const mongoose = require('mongoose')

// Get all notes
const getNotes = async (req,res) => {
    const user_id = req.user._id
    
    const notes = await Note.find({user_id}).sort({createdAt: -1})

    res.status(200).json(notes)
}

// Create a note
const createNote = async (req,res) => {
    const {title, description} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please enter all feilds', emptyFields})
    }

    // add to db
    try {
        const user_id = req.user._id
        const note = await Note.create({title, description, user_id})
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete a note
const deleteNote = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Note'})
    }

    const note = await Note.findByIdAndDelete({_id: id})

    if(!note) {
        return res.status(400).json({error: 'No such Note'})
    }

    res.status(200).json(note)
}

// Update a note
const updateNote = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Note'})
    }

    const note = await Note.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!note) {
        return res.status(400).json({error: 'No such Note'})
    }

    res.status(200).json(note)
}

module.exports = {
    getNotes,
    createNote, 
    deleteNote,
    updateNote
}