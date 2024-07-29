const db = require("better-sqlite3")("app.db")

function getToDo(){
    const query = "SELECT * FROM Todos"
    const result = db.prepare(query).all();
    return result;
}

function createTodo(todo){
    const query = "INSERT INTO Todos(title, description) VALUES(?, ?)"
    const result = db.prepare(query).run(todo.title, todo.description)
    if(result.changes === 0){
        throw new Error('An error occured when inserting a new product');
    }
}

function updateTodo(todo, todoId){
    const query = " UPDATE Todos SET title = ?, description = ? WHERE id = ? "
    const result = db.prepare(query).run(todo.title, todo.description, todoId)
    return result.changes == 1;
}

function deleteTodo(todoId){
    const query = "DELETE FROM Todos WHERE id = ?"
    const result = db.prepare(query).run(todoId);
    return result.changes == 1;
}

// export the function to use it in Todo.js
module.exports = {
    getToDo,
    createTodo,
    updateTodo,
    deleteTodo
}