var express = require('express')
var router = express.Router()
let prefix = 'https://api.iextrading.com/1.0';
var companies = require('../../companies.json');
var request = require('request-promise')
var symbols = companies.join();



router.get("/userStock", function (req, res) {

    let array = [];
    let url = prefix + '/stock/market/batch?symbols=' + symbols + '&types=quote,news,chart&range=1m&last=5';

    // http request config
    var options = {
        uri: url,
        json: true
    };

    request(options)
        .then(function (response) {
            // this is weird because we loop based on the number of user's symbols
            // so there could be more in the response variable but we only care about what we pull from
            // the db
            companies.forEach(symbol => {
                array.push({
                    symbol: response[symbol].quote.symbol,
                    name: response[symbol].quote.companyName,
                    open: response[symbol].quote.open,
                    close: response[symbol].quote.close
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

    let url = prefix + '/ref-data/symbols';

    let options = {
        uri: url,
        json: true
    };

    request(options)
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

    request(options)
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