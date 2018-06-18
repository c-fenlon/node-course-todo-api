const {SHA256} = require('crypto-js'); // hashing function - playground purposes only

// var message = "I am user number 3";
// var hash = SHA256(message);
// console.log(hash.toString());

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash:  SHA256(JSON.stringify(data) + 'secret to salt hash').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'secret to salt hash').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed, do not trust');
// }


// alternative to above:
const jwt = require('jsonwebtoken');

var data = {
    id: 234
};

var token = jwt.sign(data, '123abc'); // takes hash and returns token
console.log(token);

var decoded = jwt.verify(token, '123abc'); // checks token
console.log('decoded:', decoded);