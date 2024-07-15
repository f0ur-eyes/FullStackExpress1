// require express
const express = require("express")

// making an express app
const app=express()
// allows to read json
app.use(express.json())
// require dotenv to read the port
require("dotenv").config()
// require the route and use it
const Todo = require("./Routes/Todo")
app.use(Todo)

// find the port from env
const PORT = process.env.PORT || 3030
// the app now listens for requests in the port
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})