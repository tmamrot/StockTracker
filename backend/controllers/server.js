var express = require('express');
var app = express();

app.use(express.static('../../frontend/dist/stockTicker'));

app.use('/rss', require('./rss'))
app.use('/stocks', require('./data'))


app.listen(4200, function(){
    console.log('listening on port 4200!!');
})
