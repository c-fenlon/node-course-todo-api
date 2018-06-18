const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Delete multiple records - use empty object argument to remove all records
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findByIdAndRemove('5b276c767b3cc207a169cb12').then((todo) => {
    console.log(todo);
}); 

Todo.findOneAndRemove({_id : '5b276c767b3cc207a169cb12'}).then((todo) => {
    console.log(todo);
}); 