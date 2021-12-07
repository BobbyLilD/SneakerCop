const fetch = require('node-fetch');
const cheerio = require('cheerio');
const htmlparser = require('htmlparser2');
const {Builder} = require('selenium-webdriver');
const download = require('download');

//NEED TO ADD DATE PARSING
{
// async function nikeSnkrsTimeline() {
//     const driver = await new Builder().forBrowser('firefox').build();
//     await driver.get('https://www.nike.com/ru/launch?s=upcoming');
//     let source = await driver.getPageSource();
//     let doc = htmlparser.parseDocument(source);
//     let dom = cheerio.load(doc);
//     let linkArr = [];
//     let linkBase = 'https://www.nike.com'
//     dom('a[class="card-link d-sm-b"]',
//     'div[class="product-card ncss-row mr0-sm ml0-sm"]')
//     .each(function(i) {
//         linkArr[i] = linkBase.concat(dom(this).attr('href'));
//     });
//     console.log(linkArr);

//     for(let i = 0; i < 1; i++){ //linkArr.length
//         await nikeSnkrsIndividualItemParse(linkArr[i], driver);
//     }
// }

// async function nikeSnkrsIndividualItemParse(link, driver){
//     await driver.get(link);
//     console.log(link + " loaded");
//     let source = await driver.getPageSource();
//     console.log("source loaded");
//     let doc = htmlparser.parseDocument(source);
//     let dom = cheerio.load(doc);
//     let color = dom('h5[class*="headline"]','div[class*="product-info ncss-col-sm-12 full"]').text();
//     let name = dom('h1[class*="headline"]','div[class*="product-info ncss-col-sm-12 full"]').text();
//     let price = dom('div[class*="headline-5 pb6-sm"]','div[class*="product-info ncss-col-sm-12 full"]').text();
//     let date = dom('div[class="available-date-component"]').text();
//     let resDate = processDate(date);

//     let images = [];
//     dom('img[class="image-component u-full-width"]').each(function(i) {
//         images[i] = dom(this).attr('src');
//     })

//     let imageSrcs = downloadAndSaveImages(name, images);

//     console.log({
//         'color':color,
//         'name':name,
//         'price':price,
//         'date': resDate[0] + " " + resDate[1],
//         'image srcs': {imageSrcs}
//     });
// }

// function processDate(date){
//     date = date.replace("Доступно", " ");
//     date = date.replace("в", " ");
//     dayAndHour = date.split(' ');
//     resDate = [];
//     iter = 0;
//     for (let i = 0; i < dayAndHour.length; i++){
//         if (dayAndHour[i] != ""){
//             if (iter == 0){
//                 resDate[0] = dayAndHour[i];
//                 iter++;
//             } else{
//                 resDate[1] = dayAndHour[i];
//                 break;
//             }
//         }
//     }
//     return resDate;
// }
}


async function FetchData(){
    let requestUrl = "https://api.nike.com/product_feed/threads/v2/?anchor=0&count=21&filter=marketplace(RU)&filter=language(ru)&filter=upcoming(true)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)&filter=exclusiveAccess(true,false)&sort=effectiveStartSellDateAsc&fields=active,id,lastFetchTime,productInfo,publishedContent.nodes,publishedContent.subType,publishedContent.properties.coverCard,publishedContent.properties.productCard,publishedContent.properties.products,publishedContent.properties.publish.collections,publishedContent.properties.relatedThreads,publishedContent.properties.seo,publishedContent.properties.threadType,publishedContent.properties.custom,publishedContent.properties.title"
    let options = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
        "Accept": "*/*",
        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://www.nike.com/",
        "appid": "com.nike.commerce.snkrs.web",
        "nike-api-caller-id": "nike:snkrs:web:1.0",
        "Content-Type": "application/json; charset=UTF-8",
        "X-B3-TraceId": "75e030fb1d2d84b4",
        "X-B3-SpanId": "c2b2251aa2c50132",
        "X-B3-ParentSpanId": "e2d21d3a8b79309b",
        "Origin": "https://www.nike.com",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "same-site",
        "TE": "trailers",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    }
    let response = await fetch(requestUrl, {
        method: 'GET',
        ...options
    })
    let res = await response.json();
    return res.objects;
}

async function parseItems(){

    let source = await FetchData();

    for (let i = 0; i < source.length; i++){
        let itemInfo = {};
        itemInfo = parseItemBrand(source[i], itemInfo);
        itemInfo = parseItemColor(source[i], itemInfo);
        itemInfo = parseItemTitle(source[i], itemInfo);
        itemInfo = parseItemPrice(source[i], itemInfo);
        itemInfo = parseItemImageLinks(source[i], itemInfo);
        //itemInfo = parseItemDate(element, itemInfo);

        itemInfo['srcs'] = await downloadAndSaveImages(itemInfo['fullTitle'], itemInfo['imageLinks']);
        console.log(itemInfo);
    }
}

function parseItemTitle(source, output) {
    let title = source.publishedContent.properties.title;
    output['fullTitle'] = title;
    return output;
}

function parseItemColor(source, output){
    let color = source.publishedContent.properties.products[0].styleColor;
    output['color'] = color;
    return output;
}

function parseItemPrice (source, output) {
    let price = source.productInfo[0].merchPrice.fullPrice;
    output['price'] = price;
    return output;
}

function parseItemBrand (source, output) {
    let brand = source.productInfo[0].merchProduct.brand;
    output['brand'] = brand;
    return output;
}

function parseItemImageLinks (source, output) {
    let imageLinks = []
    let nodes = source.publishedContent.nodes[0].nodes;
    let iter = 0;
    nodes.forEach(element => {
        let link = element.properties.squarishURL;
        imageLinks[iter] = link;
        iter++;
    });

    output['imageLinks'] = imageLinks;
    return output;
}

function parseItemDate(source, output){
    let date = source.productInfo[0].launchView.startEntryDate;
    output['date'] = date;
    return output;
}

async function downloadAndSaveImages(name, links){
    destinations = [];
    for(let i = 0; i < links.length; i++){
        destinations[i] = 'D:/JS_Projects/SneakerCop/front/src/assets/' + name + '/' + name + "_"+ i +".jpg";
        await download(links[i], destinations[i]);
        console.log("downloaded");
    }
    return destinations;
}

async function downloadTest(){
    downloadAndSaveImages('test', ['https://static.nike.com/a/images/t_prod_ls/w_1920,c_limit/c80f01a4-20a9-459b-8f32-daf5467f1e08/air-jordan-1-element-gore-tex-%E2%80%9Csail%E2%80%9D-db2889-100-%E2%80%94-%D0%B4%D0%B0%D1%82%D0%B0-%D1%80%D0%B5%D0%BB%D0%B8%D0%B7%D0%B0.jpg']);
}

module.exports = {
    downloadTest
}