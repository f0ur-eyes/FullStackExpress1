// requires for the needed stuff
const express = require("express")
const router = express.Router()
const {validateTodo} = require("../Services/Utils/validator")
const {getToDo, createTodo, updateTodo, deleteTodo} = require("../Services/TodoService")

// the get request that returns all the todos
router.get("/Todo", (req, res)=>{
    // returns status code 200
    return res.status(200).json({
        // we need to interact with the database using a get (Read of CRUD)
        List:getToDo()
    })
})

// the post request that adds a new todo to the database
// first we validate the todo to make sure the todo fits the requirements
router.post("/Todo", validateTodo, (req, res)=>{
    // get the body
    const body = req.body
    // create a todo object with the given data
    const todo = { title: body.title, description:body.description}
    // we need to interact with the database using an insert (Create of CRUD)
    createTodo(todo)
    // return status 201
    return res.status(201).json({
        message:"Todo created and added to list"
    })
})

// the put request that updates a todo element in the database
// also validate the todo first
router.put("/Todo/:id", validateTodo, (req, res)=>{
    // get the body
    const body= req.body
    // create a todo object with the given data
    const todo = { title: body.title, description:body.description}
    // get the id from the params
    const todoId = req.params.id
    // get whether a record got updated
    var updated = updateTodo(todo, todoId)
    // check whether a record got updated  and return the corresponding response
    if(!updated){
        return res.status(404).json({message:"No task found with this id"})
    }
    return res.status(201).json({message:"Task successfully updated"})
})

// the delete request that deletes a todo from the database
// validate that a title was given
router.delete("/Todo/:id", (req, res)=>{
    // get the id from the params
    const todoId = req.params.id
    // get whether a record got deleted
    const deleted = deleteTodo(todoId)
    // check whether a record got deleted  and return the corresponding response
    if(!deleted){
        return res.status(404).json({message:"No task with this id found"})
    }
    return res.status(200).json({message:"Delete successfull"})
})

// exporting the router for use in main.js
module.exports = router