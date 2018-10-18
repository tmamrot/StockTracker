var req = require('request');
var parser = require('xml2js').parseString;
var fs = require('fs');
var url = 'http://finance.yahoo.com/rss/headline?s='
var companies = require('../companies.json');

module.exports = {

    // returns rss feed based on symbols in array
    getFeed: function getFeed(callback) {

        let rssFeed;
        let symbols = companies.join();

        url = url + symbols

        req(url, function (err, res, body) {

            if (err) {
                console.log('http error:')
                throw err;
            }

            parser(body, function (err, result) {

                if (err) {
                    console.log('rss parsing error');
                    throw err;
                }

                var feed = result;
                
                feed = escapeXml(String.toString(feed));

                feed = JSON.stringify(result);
                feed = JSON.parse(feed);
                rssFeed = feed.rss.channel[0].item;
                
               /* rssFeed.forEach(item => {
                    
                    console.log(item.title[0]);
                    console.log(item.description[0]);
                    console.log(item.link[0]);
                    console.log(item.pubDate[0]);

                    console.log('---------------------------');
                });

                */

                callback(null, rssFeed);

                
            });
           
        })

       
      
        
    }
}

function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}



