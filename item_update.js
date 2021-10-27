const fetch = require('node-fetch');
const DOMParser = require('xmldom').DOMParser;

exports.helloWorld = function() {
    parser = new DOMParser();
    fetch('https://www.nike.com/ru/launch/t/air-jordan-3-pine-green-emea')
    .then(res => res.text())
    .then(body => parser.parseFromString(body, "text/html"))
    .then(doc => doc.evaluate("//h1[@class='headline-1 pb3-sm']/text()", doc, null, XPathResult.STRING_TYPE, null))
    .then(result => console.log(result));
    //doc = parser.parseFromString(text, "text/html");

    //result = doc.evaluate("//h1[@class='headline-1 pb3-sm']/text()", doc, null, XPathResult.STRING_TYPE, null);
    //console.log(result);
    return "helloWorld";
};