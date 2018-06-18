const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail, 
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {   
            type: String,
            required: true
        }, 
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    // controls what is sent when a mongoose model is converted into JSON value
    var user = this;
    var userObject = user.toObject(); // converts mongoose model to regular object

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() { // has to have a this keyword => can't be an arrow function
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123');

    user.tokens = user.tokens.concat({access, token});
    return user.save().then(() => {
        return token;
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = {User}

// var user = new User({
//     email: 'carfenlon@gmail.com'
// });
// user.save().then((doc) => {
//     console.log('Saved user', doc);
// }, (e) => {
//     console.log('Unable to save');
// })