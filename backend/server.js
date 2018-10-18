let express = require('express');
var app = express();
let stock = require('./tickerData');
let rss = require('./rssIngest');

app.use(express.static('../frontend/dist/stockTicker'));


app.listen(4200, function(){
    console.log('listening on port 4200!!');
});

app.get("/userStock",function(req,res){

    res.setHeader('Content-Type', 'application/json');

    stock.getUserStocks(function(err,symbols) {
        if(err){
            throw err;
        }
    res.status(200).send(symbols);
    });
});

app.get("/allStocks", function(res,req){
    stock.getAllStocks();
});

 app.get("/rss", function(req, res){
    
     res.setHeader('Content-Type', 'application/json');

     rss.getFeed(function(err,feed) {
         if(err){
             throw err;
         }
     res.status(200).send(JSON.stringify(feed));
     }); 
    
 });
