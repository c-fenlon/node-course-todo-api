const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b2280ed97b6d3a9d458e861';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

Todo.find({
    _id: id // mongoose allows string ID instead of ObjectID (it does the conversion)
}).then((todos) => {
    console.log('Todos:', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo:', todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        console.log('ID not found');
        return
    }
    console.log('Todo by ID', todo);
}).catch((e) => console.log(e));



var userId = '5b22701988cb688f33a117de'
User.findById(userId).then((user) => {
    if (!user) {
        console.log('User ID not found');
        return
    }
    console.log('User by ID', user);
}).catch((e) => console.log(e));