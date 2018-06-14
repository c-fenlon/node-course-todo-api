const {MongoClient, ObjectID} = require('mongodb'); // destructuring - equivalent to above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to mongodb server');
    }
    console.log('Connected to mongodb server');
    
    const db = client.db('TodoApp');

    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5b22402baceb8045c4853592'),
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndUpdate({
        name: 'James',
    }, {
        $set: {
            name: 'NewName'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    
    client.close();
});