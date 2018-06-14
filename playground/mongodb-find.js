// Documentation: http://mongodb.github.io/node-mongodb-native/

const {MongoClient, ObjectID} = require('mongodb'); // destructuring - equivalent to above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    
    const db = client.db('TodoApp');

    // var cursor = db.collection('Todos').find({
    //     _id: new ObjectID('5b2240976d097747fc4ebbb6')
    // }); // returns a mongodb cursor - pointer to found records
    // // find() gets all records
    // // IDs are not strings - ObjectID
    // cursor.toArray().then((docs) => {
    //     // toArray returns Promise - if fulfilled, print to screen
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch docs', err);
    // });

    var cursor = db.collection('Todos').find(); 
    cursor.count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch docs', err);
    });

    var cursor = db.collection('Users').find({name: 'Caroline'});
    cursor.toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch docs', err);
    });
    client.close();
});