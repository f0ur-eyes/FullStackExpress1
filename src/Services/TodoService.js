const db = require("better-sqlite3")("app.db")

// function to get data from database
function getToDo(){
    const query = "SELECT * FROM Todos"
    const result = db.prepare(query).all();
    return result;
}

// function to create data and add it to database
function createTodo(todo){
    const query = "INSERT INTO Todos(title, description) VALUES(?, ?)"
    const result = db.prepare(query).run(todo.title, todo.description)
    // make sure that changes did occur, and specifically only 1 change
    if(result.changes === 0){
        throw new Error('An error occured when inserting a new product');
    }
}

// function to update data in database
function updateTodo(todo, todoId){
    const query = " UPDATE Todos SET title = ?, description = ? WHERE id = ? "
    const result = db.prepare(query).run(todo.title, todo.description, todoId)
    // return whether this one todo got changed successfully or not
    return result.changes == 1;
}

// function to delete data from database
function deleteTodo(todoId){
    const query = "DELETE FROM Todos WHERE id = ?"
    const result = db.prepare(query).run(todoId);
    // rerturn whether this one todo got removed successfully or not
    return result.changes == 1;
}

// export the functions to use in other files
module.exports = {
    getToDo,
    createTodo,
    updateTodo,
    deleteTodo
}