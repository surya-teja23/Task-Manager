const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasksController');
const router = express.Router()

// Read
router.get('/' , getTasks);

// Create 
router.post('/' , createTask)

// Update
router.patch('/:id' , updateTask)

// Delete
router.delete('/:id' , deleteTask)

module.exports = router