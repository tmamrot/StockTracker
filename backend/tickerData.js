var req = require('request');
let prefix = 'https://api.iextrading.com/1.0';
var companies = require('../companies.json');

module.exports = {

    // will just recieve an array of symbols
    // outputs all information used for populating feed of cards on the home page
    getUserStocks: function getUserStocks(callback) {

        // comma seperated list
        var symbols = companies.join();
        var array = [];

        let suffix = '/stock/market/batch?symbols=' + symbols + '&types=quote,news,chart&range=1m&last=5';
        let url = prefix + suffix;

        // request to exti api
        req(url, function (err, res, body) {
            if(err){
                callback(err, null);
            }

            let json = JSON.parse(body);

            // remember companies is a the array of symbols in companies.json, soon 
            // this array will need to be pulled from a db
            companies.forEach(symbol => {
                array.push({
                    symbol: json[symbol].quote.symbol,
                    name: json[symbol].quote.companyName,
                    open: json[symbol].quote.open,
                    close: json[symbol].quote.close
                })
                
               /* console.log('Symbol:' + json[symbol].quote.symbol);
                console.log('Company Name:' + json[symbol].quote.companyName);
                console.log('Open Price:' + json[symbol].quote.open);
                console.log('Close Price:' + json[symbol].quote.close);

                console.log('\n');
                */


            });
            
            callback(null, array);
        });

       
    },

    // Gets all listed stocks from API 
    // will be used to populate search results when searching 
    // for a stock to add to feed
    // will proabably write another method in different module to parese this data out
    getAllStocks: function getAllStocks() {

        let suffix = '/ref-data/symbols';

        url = prefix + suffix

        req(url, function (err, res, body) {
            if (err) {
                throw err;
            }
            else {
                console.log(JSON.parse(body));
                return JSON.parse(body);
            }
        });
    }
}

function formatArray(){

}


