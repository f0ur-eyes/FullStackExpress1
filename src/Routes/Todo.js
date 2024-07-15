// requires for the needed stuff
const express = require("express")
const router = express.Router()
const {validateTodo, validateTitle} = require("../Services/Utils/validator")
const getIndex = require("../Services/TodoService")

// hard coded list for the todo
let list=[]

// the get request that returns the whole list
router.get("/Todo", (req, res)=>{
    // returns status code 200
    return res.status(200).json({
        List:list
    })
})

// the post request that adds a new todo to the list
// first we validate the todo to make sure the todo fits the requirements
router.post("/Todo", validateTodo, (req, res)=>{
    // get the body
    const body = req.body
    // push json to the list
    list.push({
        // the json contains a title and a description
        title:body.title,
        description:body.description
    })
    // return status 201
    return res.status(201).json({
        message:"Todo created and added to list"
    })
})

// the put request that updates a todo element in the list
// also validate the todo first
router.put("/Todo", validateTodo, (req, res)=>{
    // get the body
    const body= req.body
    //use a function that returns the index of a matching title
    const index= getIndex(list, body.title)
    // if a matching title is found, the function returns a positive integer
    if(index!==-1){
        // update the description
        list[index].description=body.description
        // return status 200
        return res.status(200).json({message:"Update successfull"})
    }
    // if the function didn't find a matching title
    // return status 404
    return res.status(404).json({message:"No task found with this title"})
})

// the delete request that deletes a todo from the list
// validate that a title was given
router.delete("/Todo", validateTitle, (req, res)=>{
    // get the body
    const body= req.body
    // use the function to find the matching title
    const index= getIndex(list, body.title)
    // if found
    if(index!==-1){
        // filter and update the list to remove the item that matches
        list= list.filter(item => list[index]!==item)
        // return status 200
        return res.status(200).json({message:"Delete successfull"})
    }
    // if the funcion didn't find a matching title
    // return status 404
    return res.status(404).json({message:"No task with this title found"})
})

// exporting the router for use in main.js
module.exports = router