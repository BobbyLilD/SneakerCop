const fetch = require("node-fetch");
const download = require("download");
const Item = require("../database/models/Item.model");
const cheerio = require("cheerio");
const StoreOffer = require("../database/models/StoreOffer.model");
const ItemImage = require("../database/models/Image.model");

async function fetchData() {
  let requestUrl =
    "https://api.nike.com/product_feed/threads/v2/?anchor=0&count=21&filter=marketplace(RU)&filter=language(ru)&filter=upcoming(true)&filter=channelId(010794e5-35fe-4e32-aaff-cd2c74f89d61)&filter=exclusiveAccess(true,false)&sort=effectiveStartSellDateAsc&fields=active,id,lastFetchTime,productInfo,publishedContent.nodes,publishedContent.subType,publishedContent.properties.coverCard,publishedContent.properties.productCard,publishedContent.properties.products,publishedContent.properties.publish.collections,publishedContent.properties.relatedThreads,publishedContent.properties.seo,publishedContent.properties.threadType,publishedContent.properties.custom,publishedContent.properties.title";
  let options = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:94.0) Gecko/20100101 Firefox/94.0",
    Accept: "*/*",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Accept-Encoding": "gzip, deflate, br",
    Referer: "https://www.nike.com/",
    appid: "com.nike.commerce.snkrs.web",
    "nike-api-caller-id": "nike:snkrs:web:1.0",
    "Content-Type": "application/json; charset=UTF-8",
    "X-B3-TraceId": "75e030fb1d2d84b4",
    "X-B3-SpanId": "c2b2251aa2c50132",
    "X-B3-ParentSpanId": "e2d21d3a8b79309b",
    Origin: "https://www.nike.com",
    Connection: "keep-alive",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    TE: "trailers",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
  };
  let response = await fetch(requestUrl, {
    method: "GET",
    ...options,
  });
  let res = await response.json();
  return res.objects;
}

async function fetchLinks(itemsInfo, correctLinks) {
  let res = await fetch("https://www.nike.com/ru/launch?s=upcoming");
  let html = await res.text();
  const $ = cheerio.load(html);
  let curItem = 0;
  $('a[data-qa="product-card-link"]').each(function (i) {
    if (correctLinks.includes(i)) {
      let link = "https://www.nike.com" + $(this).attr("href");
      itemsInfo[curItem]["link"] = link;
      console.log(link);
      curItem++;
    }
  });

  return itemsInfo;
}

async function parseItems() {
  let source = await fetchData();
  let itemsInfo = [];
  let correctItems = [];

  for (let i = 0; i < source.length; i++) {
    let itemInfo = {};
    for (let f = 0; f < source[i].productInfo.length; f++) {
      if (
        source[i].productInfo[f].merchProduct.productType == "FOOTWEAR" &&
        source[i].productInfo[f].launchView != undefined &&
        (source[i].productInfo[f].merchProduct.genders[0] == "MEN" ||
          source[i].productInfo[f].merchProduct.genders[0] == "WOMEN")
      ) {
        correctItems.push(i);
        console.log({ object: i });
        console.log({ info: f });
        itemInfo = parseItemBrand(source[i].productInfo[f], itemInfo);
        itemInfo = parseItemColor(source[i].productInfo[f], itemInfo);
        itemInfo = parseItemTitle(source[i].productInfo[f], itemInfo);
        itemInfo = parseItemPrice(source[i].productInfo[f], itemInfo);
        itemInfo = parseItemDate(source[i].productInfo[f], itemInfo);
        itemInfo = parseItemSizes(source[i].productInfo[f], itemInfo);
        itemInfo = parseItemImageLinks(source[i], itemInfo);

        itemInfo["srcs"] = await downloadAndSaveImages(
          itemInfo["fullTitle"],
          itemInfo["color"],
          itemInfo["imageLinks"]
        );
        console.log(itemInfo);
        itemsInfo.push(itemInfo);

        break;
      }
    }
  }

  itemsInfo = await fetchLinks(itemsInfo, correctItems);
  itemsInfo = await postItems(itemsInfo);
  await postImages(itemsInfo);
  await postOffers(itemsInfo);
}

function parseItemTitle(source, output) {
  let title = source.productContent.title;
  output["fullTitle"] = title;
  return output;
}

function parseItemColor(source, output) {
  let color = source.merchProduct.styleColor;
  output["color"] = color;
  return output;
}

function parseItemPrice(source, output) {
  let price = source.merchPrice.fullPrice;
  output["price"] = price;
  return output;
}

function parseItemBrand(source, output) {
  let brand = source.merchProduct.brand;
  output["brand"] = brand;
  return output;
}

function parseItemImageLinks(source, output) {
  let imageLinks = [];
  let nodes = source.publishedContent.nodes[0].nodes;
  let iter = 0;
  nodes.forEach((element) => {
    let link = element.properties.squarishURL;
    imageLinks[iter] = link;
    iter++;
  });

  output["imageLinks"] = imageLinks;
  return output;
}

function parseItemDate(source, output) {
  if (source.launchView.paymentMethod === "PREPAY") {
    let date = source.launchView.startEntryDate;
    output["date"] = date;
  } else {
    output["date"] = "unknown";
  }
  return output;
}

function parseItemSizes(source, output) {
  let sizes = [];
  source.skus.forEach((element) => {
    sizes.push(element.nikeSize);
  });
  output["sizes"] = sizes;
  return output;
}

async function downloadAndSaveImages(name, colorCode, links) {
  let destinations = [];
  let successfulDownloads = 0;
  for (let i = 0; i < links.length; i++) {
    curDest =
      "D:/Programming/JS/SneakerCop/Front/src/assets/images/" + name + "_" + colorCode + "/"; //D:/JS_Projects/SneakerCop  //D:/Programming/JS/SneakerCop
    links[i] = links[i]
      .substring(0, links[i].lastIndexOf("/") + 1)
      .concat(".jpg");
    console.log(links[i]);
    //console.log("downloaded");

    const res = await fetch(links[i]);
    if (res.status != 404) {
      await download(links[i], curDest, { filename: name + "_" + i + ".jpg" });
      destinations[successfulDownloads] =
      // "../../../Storage/" +
      name +
      "_" +
      colorCode +
      "/" +
      name +
      "_" +
      i +
      ".jpg"; //D:/JS_Projects/SneakerCop
      successfulDownloads++;
    }
  }
  return destinations;
}

async function postItems(itemsInfo) {
  for (let i = 0; i < itemsInfo.length; i++) {
    let item = itemsInfo[i];
    let foundItem = await Item.findOne({
      where: {
        name: item["fullTitle"],
        styleCode: item["color"],
      },
    });
    if (!foundItem) {
      let createdItem = await Item.create({
        name: item["fullTitle"],
        brand: item["brand"],
        styleCode: item["color"],
        publishDate: Date.now(),
      });
      item["createdID"] = createdItem.id;
    } else {
      item["foundID"] = foundItem.id;
    }
  }
  return itemsInfo;
}

async function postImages(itemsInfo) {
  console.log("In image function!");
  for (let i = 0; i < itemsInfo.length; i++) {
    let item = itemsInfo[i];
    console.log("In loop!");
    if (item["createdID"] != undefined) {
      console.log("Posting images!");
      let imageSrcs = item["srcs"];
      for (let f = 0; f < imageSrcs.length; f++) {
        if (f == 0) {
          await ItemImage.create({
            itemId: item["createdID"],
            location: imageSrcs[f],
            isFront: true,
          });
        } else {
          await ItemImage.create({
            itemId: item["createdID"],
            location: imageSrcs[f],
          });
        }
      }
    }
  }
}

async function postOffers(itemsInfo) {
  for (let i = 0; i < itemsInfo.length; i++) {
    let item = itemsInfo[i];
    let foundOffer = await StoreOffer.findOne({
      where: {
        link: item["link"],
      },
    });

    if (!foundOffer) {
      let id;
      if (item["createdID"] == undefined) {
        id = item["foundID"];
      } else {
        id = item["createdID"];
      }
      let offer = await StoreOffer.create({
        store: "Nike SNKRS",
        link: item["link"],
        price: item["price"],
        date: item["date"],
        availableSizes: item["sizes"],
        itemId: id,
      });

      if (offer) {
        console.log("Offer submitted");
      }
    }
  }
}

module.exports = {
  parseItems,
};
