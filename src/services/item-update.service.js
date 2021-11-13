const fetch = require('node-fetch');
const cheerio = require('cheerio');
const htmlparser = require('htmlparser2');
const {Builder} = require('selenium-webdriver');


exports.helloWorld = function() {
    nikeSnkrsTimeline()
    
    return "helloWorld";
};

//NEED TO ADD DATE PARSING
async function nikeSnkrsTimeline(){

    const driver = await new Builder().forBrowser('firefox').build();
    driver.get('https://www.nike.com/ru/launch?s=upcoming').then(
        res => driver.getPageSource()
    ).then(
        result => {
            let doc = htmlparser.parseDocument(result);
            let dom = cheerio.load(doc);
            let linkArr = [];
            let linkBase = 'https://www.nike.com'
            dom('a[class="card-link d-sm-b"]',
            'div[class="product-card ncss-row mr0-sm ml0-sm"]')
            .each(function(i,e) {
                linkArr[i] = linkBase.concat(dom(this).attr('href'));
            });
            console.log(linkArr);

            nikeSnkrsIndividualItemParse(linkArr, driver, 0);
        }
    )

}

async function nikeSnkrsIndividualItemParse(linkArr, driver, iter){
    
    await driver.get(linkArr[iter]);
    console.log(linkArr[iter] + " loaded");
    let result = await driver.getPageSource();
    console.log("source loaded");
    let doc = htmlparser.parseDocument(result);
    let dom = cheerio.load(doc);
    let color = dom('h5[class="headline-1 pb3-sm"]','div[class="product-info ncss-col-sm-12 full"]').text();
    let name = dom('h1[class="headline-5 pb3-sm"]','div[class="product-info ncss-col-sm-12 full"]').text();
    let price = dom('div[class="headline-5 pb6-sm fs14-sm fs16-md"]','div[class="product-info ncss-col-sm-12 full"]').text();
    let date = dom('div[class="available-date-component"]').text();
    console.log({
        'color':color,
        'name':name,
        'price':price,
        'date':date
    });

    if(iter + 1 < linkArr.length){
        nikeSnkrsIndividualItemParse(linkArr,driver,iter+1);
    }

}