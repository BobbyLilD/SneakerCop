const fetch = require('node-fetch');
const cheerio = require('cheerio');
const htmlparser = require('htmlparser2');
const {Builder} = require('selenium-webdriver');
const http = require('http');
const fs = require('fs');

//NEED TO ADD DATE PARSING

async function nikeSnkrsTimeline() {
    const driver = await new Builder().forBrowser('firefox').build();
    await driver.get('https://www.nike.com/ru/launch?s=upcoming');
    let source = await driver.getPageSource();
    let doc = htmlparser.parseDocument(source);
    let dom = cheerio.load(doc);
    let linkArr = [];
    let linkBase = 'https://www.nike.com'
    dom('a[class="card-link d-sm-b"]',
    'div[class="product-card ncss-row mr0-sm ml0-sm"]')
    .each(function(i) {
        linkArr[i] = linkBase.concat(dom(this).attr('href'));
    });
    console.log(linkArr);

    for(let i = 0; i < 1; i++){ //linkArr.length
        await nikeSnkrsIndividualItemParse(linkArr[i], driver);
    }
}

async function nikeSnkrsIndividualItemParse(link, driver){
    await driver.get(link);
    console.log(link + " loaded");
    let source = await driver.getPageSource();
    console.log("source loaded");
    let doc = htmlparser.parseDocument(source);
    let dom = cheerio.load(doc);
    let color = dom('h5[class*="headline"]','div[class*="product-info ncss-col-sm-12 full"]').text();
    let name = dom('h1[class*="headline"]','div[class*="product-info ncss-col-sm-12 full"]').text();
    let price = dom('div[class*="headline-5 pb6-sm"]','div[class*="product-info ncss-col-sm-12 full"]').text();
    let date = dom('div[class="available-date-component"]').text();
    let resDate = processDate(date);

    let images = [];
    dom('img[class="image-component u-full-width"]').each(function(i) {
        images[i] = dom(this).attr('src');
    })

    let imageSrcs = await downloadAndSaveImages(name, images);

    console.log({
        'color':color,
        'name':name,
        'price':price,
        'date': resDate[0] + " " + resDate[1],
        'image srcs': {imageSrcs}
    });
}

function processDate(date){
    date = date.replace("Доступно", " ");
    date = date.replace("в", " ");
    dayAndHour = date.split(' ');
    resDate = [];
    iter = 0;
    for (let i = 0; i < dayAndHour.length; i++){
        if (dayAndHour[i] != ""){
            if (iter == 0){
                resDate[0] = dayAndHour[i];
                iter++;
            } else{
                resDate[1] = dayAndHour[i];
                break;
            }
        }
    }
    return resDate;
}

async function downloadAndSaveImages(name, links){
    destinations = []
    for(let i = 0; i < links.length; i++){
        destinations[i] = '../../../front/src/assets/' + name + '/' + name + "_"+ i +".jpg";
        const file = fs.createWriteStream(destinations[i]);
        const request = http.get(links[i], function(response) {
        response.pipe(file);
        file.end();
});
    }
    return destinations;
}

module.exports = {
    nikeSnkrsTimeline
}