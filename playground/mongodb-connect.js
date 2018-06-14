// const MongoClient = require('mongodb').MongoClient; // no destructuring
// const {MongoClient} = require('mongodb'); // destructuring - equivalent to above
const {MongoClient, ObjectID} = require('mongodb'); // destructuring - equivalent to above

// var obj = new ObjectID(); // test using ObjectID
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Caroline',
        age: 28, 
        location: 'Dublin'
    }, (err, result) => {
        if (err) {
            return console.log('Couldn\'t insert a user');
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    });

    client.close();
});