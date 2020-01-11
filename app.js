var express = require('express');
var bodyParser = require('body-parser'); // Reference to bodyparser

 //STEP 1 - Reference to mongoose
var mongoose = require('mongoose');

//STEP 2- Open a connection to mongoDB , Book API is the name of the DB in Mongo
//var db = mongoose.connect('mongodb://localhost/booksDB');
var db = mongoose.connect('mongodb://localhost/retailmap');

//STEP 3 - As mongoose converts documents in mongoDB to json(model), we need a model
var Book = require('./models/bookModel')

var app = express();
var port = process.env.PORT || 3000;

// We have to tell app that we are going to use body parser
//app.use(bodyParser)  // Not this
app.use(bodyParser.json()) // we have to explicitly tell we are using json parser
app.use(bodyParser.urlencoded({extended:true}))

// Call the route module with book model injected
bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api', bookRouter);

app.listen(port, function () {
    console.log('Running on port ' + port);
})