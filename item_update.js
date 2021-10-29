const fetch = require('node-fetch');
const cheerio = require('cheerio');
const htmlparser = require('htmlparser2');
const {Builder} = require('selenium-webdriver');

exports.helloWorld = function() {
    nikeSnkrsTimeline()
    
    return "helloWorld";
};

async function nikeSnkrsTimeline(){

    // fetch('https://www.nike.com/ru/launch/t/air-jordan-3-pine-green-emea')
    // .then(res => res.text())
    // .then(body => {
    //     doc = htmlparser.parseDocument(body);
    //     var dom = cheerio.load(doc);
    //     var color = dom('h5[class="headline-1 pb3-sm"]','div[class="product-info ncss-col-sm-12 full"]').text();
    //     var name = dom('h1[class="headline-5 pb3-sm"]','div[class="product-info ncss-col-sm-12 full"]').text();
    //     var price = dom('div[class="headline-5 pb6-sm fs14-sm fs16-md"]','div[class="product-info ncss-col-sm-12 full"]').text();
    //     var date = dom('div[class="available-date-component"]').text();
    //     console.log({
    //         'color':color,
    //         'name':name,
    //         'price':price,
    //         'date':date
    //     });
    // })

    var driver = await new Builder().forBrowser('firefox').build();
    driver.get('https://www.nike.com/ru/launch/t/air-jordan-3-pine-green-emea');
    driver.getPageSource


    // .then(doc => doc.evaluate("//h1[@class='headline-1 pb3-sm']/text()", doc, null, XPathResult.STRING_TYPE, null))
    // .then(result => console.log(result));
}