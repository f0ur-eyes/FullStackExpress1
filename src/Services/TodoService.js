// a function that checks the index of a todo by matching a title
function getIndex(list, title) {
    // iterate throught the indexes of the list
    for(i in list){
        // if the index's title matches the given title
        if(list[i].title===title){
            // return the index
            return i
        }
    }
    // if no index has a matching title, return -1, a negative index to represent the fail
    return -1
}

// export the function to use it in Todo.js
module.exports = getIndex