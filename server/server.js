require('./config/config')

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos}); // send object instead of just array, then additional variables can be added in future
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => { // :id creates id variable on request object
    // res.send(req.params); // to check params sent in GET 
    var id = req.params.id;

    // validate ID
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (! todo) {
            return res.status(404).send();
        } 
        res.send({todo});

    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
    // get the ID
    // validate ID -> return 404
    // remove todo by ID
        // success
            // no doc could be found: 404
            // found and deleted: 200
        // error: 400 with empty body
    
    var id = req.params.id;

    // validate ID
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send(e);
    });
})

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']); // only allow users to update some properties

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed){ // check if completed set to true
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']); // only allow users to update some properties
    
    var user = new User(body); // send body instead of creating a new object {body.email, body.password}

    user.save().then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};
