var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
    title : {
        type : 'string'
    },
    author : {type : 'string'},
    genre : {type : 'string'},
    read : {type : Boolean, default: false}
});

// This is going to add a new model called 'Book' into mongoose.Schema 
// which later can be accessed in app.js using 'Book'
// Connectin string -> 'mongodb://localhost/booksDB'
// collection under booksDB is 'booksCollection' which is the third parameter
module.exports = mongoose.model('Book',bookModel,'booksCollection');