var express = require('express')
var router = express.Router()
var req = require('request');
let prefix = 'https://api.iextrading.com/1.0';
var companies = require('../../companies.json');
var rp = require('request-promise')
var symbols = companies.join();



router.get("/userStock", function (req, res) {

    let array = [];
    let suffix = '/stock/market/batch?symbols=' + symbols + '&types=quote,news,chart&range=1m&last=5';
    let url = prefix + suffix;

    var options = {
        uri: url,
        json: true 
    };

    rp(options)
        .then(function (repos) {
            // this is weird because we loop based on the number of user's symbols
            // so there could be more in the array variable but we only care about what we pull from
            // the db
            companies.forEach(symbol => {
                array.push({
                    symbol: repos[symbol].quote.symbol,
                    name: repos[symbol].quote.companyName,
                    open: repos[symbol].quote.open,
                    close: repos[symbol].quote.close
                })
            })
            res.status(200).send(array)
        })
        .catch(function (err) {
            // API call failed...
            console.log(err);
            res.status(500).send()
        })

})

router.get('/allStocks', function (req, res) {

    let suffix = '/ref-data/symbols';
    let url = prefix + suffix

    let options = {
        uri: url,
        json: true 
    };

    rp(options)
        .then(function (repos) {
            res.status(200).send(repos)
        })
        .catch(function (err) {
            console.log(err)
        })
})

// this route needs to be able to handle ALL increments that can be returned by the api
router.get("/historicData/:symbol/:inc", function (req, res) {

    let data = [];
    let url = prefix + '/stock/' + req.params.symbol + '/chart/' + req.params.inc + '/chartSimplify';

    let options = {
        uri: url,
        json: true
    }

    rp(options)
        .then(function (result) {

            result.forEach(day => {

                data.push({
                    date: day.label,
                    price: day.average
                })
            })

            res.status(200).send(result)
        })
        .catch(function (err) {
            console.log(err);
            res.send(500).send(err)
        })
})


module.exports = router