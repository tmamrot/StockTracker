var express = require('express')
var router = express.Router()
var parser = require('xml2js').parseString;
var companies = require('../../companies.json')
var symbols = companies.join();
var rp = require('request-promise')
var options = {
    uri: 'http://finance.yahoo.com/rss/headline?s=' + symbols,
    json: true
};

router.get('/', function (req, res) {

    rp(options)
        .then(parseRss2Js)
        .then(function (result) {
            
            // extract just the channel full of itemsto send to the front end 
            let feed = JSON.stringify(result)
            feed = JSON.parse(feed)

            rssFeed = feed.rss.channel[0].item;
            res.status(200).send(rssFeed)
        })
        .catch(function (err) {
            res.status(500).send()
            console.log(err)
        })
});

function parseRss2Js(string) {
    return new Promise(function (resolve, reject) {
        parser(string, function (err, result) {
            if (err) {
                reject(err)
            }
            else {
                resolve(result)
            }
        })
    })
}



module.exports = router