var express = require('express');

var routes = function(Book){
    
    var bookRouter = express.Router();
    //ROUTING CODE FROM App.js TO BE PLACED HERE 
    
    bookRouter.route('/books')
    .post(function(req,res){
        var book = new Book(req.body)
        book.save()
        res.status(201).send(book)
    })
    .get(function(req,res){
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
              res.json(req.book);
    })
    .put(function(req,res){         
            req.book.title = req.body.title
            req.book.author = req.body.author
            req.book.genre = req.body.genre
            req.book.read = req.body.read
            req.book.save()  
            res.json(req.book)  
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
        req.book.remove();
    })  
    
    return bookRouter;

};

module.exports = routes;