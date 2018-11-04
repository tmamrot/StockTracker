var express = require('express');
var app = express();

app.use(express.static('../../frontend/dist/stockTicker'));




app.use('/rss', require('./rss'))
app.use('/stocks', require('./data'))


// allow for PathLocationStrategy
app.use('/', function(req,res){
    res.sendFile('../../frontend/dist/stockTicker/index.html', {root: __dirname});
})







app.listen(4200, function(){
    console.log('listening on port 4200!!');
})
