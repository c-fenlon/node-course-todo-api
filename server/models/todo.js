var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', { 
    text: { // to set type, required, etc for 'text' attribute
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
}

// var newTodo = new Todo({ // new instance of Todo model
//     text: 'Cook dinner'
// });
// newTodo.save().then((doc) => {
//     console.log('Saved todo ', doc);
// }, (e) => {
//     console.log('Unable to save log');
// });

// var newTodo2 = new Todo({ // new instance of Todo model
//     text: 'Go for a run',
//     completed: true,
//     completedAt: 12335
// });
// newTodo2.save().then((doc) => {
//     console.log('Saved todo ', doc);
// }, (e) => {
//     console.log('Unable to save log');
// });