const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo'); 
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 3333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done()); // empty database before every request
}

userOneID = new ObjectID();
userTwoID = new ObjectID();
const users = [{
    _id: userOneID,
    email: 'user@mail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneID, access: 'auth'}, 'abc123').toString()
    }]
}, {
        _id: userTwoID,
        email: 'two@mail.com',
        password: 'userTwoPass'
}];

const populateUsers = (done) => {
    User.remove({}).then(() => {
      var userOne = new User(users[0]).save(); // need to call save to run middleware
      var userTwo = new User(users[1]).save();  

      return Promise.all([userOne, userTwo]); // waits for all promises to complete
    }).then(() => done());
}

module.exports = {todos, populateTodos, users, populateUsers};