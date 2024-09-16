var express = require('express');
const mongoClient = require('../mongoClient')
const COLLECTION_BOOKS = 'booksCollection'
const {ObjectId} = require('mongodb');

var routes = function(Book){
    
    var bookRouter = express.Router();
       
    //ROUTING CODE FROM App.js TO BE PLACED HERE     
    bookRouter.route('/books')
    .post(function(req,res){
        
        mongoClient.connect().then((database) =>{
        //console.log(database)
        const myDB = database.db('booksDB')       
        var result = myDB.collection(COLLECTION_BOOKS).insertOne(req.body)
            .then((result) =>{                    
                    res.json(result.ops[0])                        
            })                       
        })
        
        // var book = new Book(req.body)
        // book.save()
        // res.status(201).send(book)
    })
    .get(function(req,res){
        
        // mongoClient.connect().then((database) =>{
        //     //console.log(database)
        //         const myDB = database.db('booksDB')              
        //         myDB.collection(COLLECTION_BOOKS).find()
        //         .then((result) =>{                    
        //              res.json(result)                        
        //         })                       
        //     })
        
        var query = {}
        if (req.query.genere)
        {
            query = req.query.genere
        }        
         Book.find(query,function (err, books) {
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    })
    
bookRouter.use('/books/:Id', function(req,res,next){
        
    Book.findById(req.params.Id,function (err, book) {
            if (err)
                res.status(500).send(err);
            else if (book)
            {
                req.book = book
                next()
            }
            else
            {
                res.status(404).send('no book found');
            }                
        });     
})
    
    
bookRouter.route('/books/:Id')
     .get(function(req,res){      
         
          mongoClient.connect().then((database) =>{
            //console.log(database)
                const myDB = database.db('booksDB')
                const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null
                myDB.collection(COLLECTION_BOOKS).findOne({"_id":safeObjectId(req.params.Id)})
                .then((result) =>{                    
                     res.json(result)                        
                })                       
            })
          
        //res.json(req.book);
    })
    .put(function(req,res){  
        
         mongoClient.connect().then((database) =>{
            //console.log(database)
            const myDB = database.db('booksDB')
            const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null  
            const filter = {"_id":safeObjectId(req.params.Id)}
            const update = {$set :req.body }
            const optional = {upsert : false}
            var result = myDB.collection(COLLECTION_BOOKS).findOneAndUpdate(filter,update,optional)
                .then((result) =>{                    
                     res.json(result)                        
                })                       
            })
            
             
            // req.book.title = req.body.title
            // req.book.author = req.body.author
            // req.book.genre = req.body.genre
            // req.book.read = req.body.read
            // req.book.save()  
            // res.json(req.book)  
    }) 
    .patch(function(req,res){    
       if(req.body._id)
        delete req.body._id
             
       for(var p in req.body)
        {
            req.book[p] = req.body[p]
        }
        req.book.save()   
        res.json(req.book)     
    })
    .delete(function(req, res){
        
         mongoClient.connect().then((database) =>{
        //console.log(database)
        const myDB = database.db('booksDB')    
        const safeObjectId = s => ObjectId.isValid(s) ? new ObjectId(s) : null     
        var result = myDB.collection(COLLECTION_BOOKS).deleteOne({"_id":safeObjectId(req.params.Id)})
            .then((result) =>{                    
                    res.json(result)                        
            })                       
        })
       
      
        //req.book.remove();
    })  
    
    return bookRouter;

};

module.exports = routes;