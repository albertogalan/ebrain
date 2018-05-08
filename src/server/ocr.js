/**
登陆 百度bcs控制台中心 申请access key
https://console.bce.baidu.com/iam/#/iam/accesslist
**/

var AipOcrClient = require("baidu-aip-sdk").ocr;
var fs = require('fs');
const path = require('path');
const md5File = require('md5-file');


class Ocr {
    constructor(ocr) {
        this.f = ocr.f;
        this.img = ocr.img;
        this.title = ocr.title;
        this.id = ocr.id;
        this.typeocr = ocr.typeocr;
        this.page = ocr.page;
        this.lan = ocr.lan;
        this.ocrengine = ocr.ocrengine;
        const APP_ID = "10322470";
        const API_KEY = "sVvltKYtmWFKc8k3oX4HGvQG";
        const SECRET_KEY = "NhdgLgMQ05nHsSPLnyThZT3itGgFSQO3";
        this.client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
        var image = fs.readFileSync(this.img);
        var f = ocr.f
        this.page = ocr.page
        // var datafile = require(this.f)
        const imagehash = md5File.sync(this.img)


        this.data = {
            language_type: this.lan,
            detect_direction: false,
            detect_language: false,
            probability: false
        };

    }


    ocrstandard() {
        var base64Img = new Buffer(this.img).toString('base64');
        var datafile = require(this.f)
        console.log(datafile.pages.findIndex(p => p.imagehash == this.imagehash))
        if (datafile.pages.findIndex(p => p.imagehash == this.imagehash) != -1)
            console.log('page ' + this.page + ' already process no need to do again')
        else {

            // do it if doesnt have the page before
            this.client.generalBasic(base64Img, this.data).then(function(result) {
                // console.log(JSON.stringify(result));
                console.log('procesing page ' + this.page)
                var myObj = result;
                // myObj={};
                myObj.page = this.page;
                myObj.imagehash = this.imagehash;
                myObj.ocrengine = this.engine;
                myObj.typeocr = this.typeocr;
                datafile.pages.push(myObj);
                fs.writeFile(this.f, JSON.stringify(datafile, null, 4));
            });




        }
    }

     ocrtable() {

        var base64Img = new Buffer(this.img).toString('base64');
        var datafile = require(this.f)
        console.log(datafile.pages.findIndex(p => p.imagehash == this.imagehash))
        if (datafile.pages.findIndex(p => p.imagehash == this.imagehash) != 0)
            console.log('page ' + this.page + ' already process no need to do again')
        else {

            // do it if doesnt have the page before
            this.client.tableRecorgnize(base64Img, 'excel', 10000, 1000).then(function(result) {
                // console.log(JSON.stringify(result));
                // console.log('procesing page ' + this.page)
                var myObj = result;
                console.log(result)
                // myObj={};
                myObj.page = this.page;
                myObj.imagehash = this.imagehash;
                myObj.ocrengine = this.engine;
                myObj.typeocr = this.typeocr;
                datafile.pages.push(myObj);
                fs.writeFile(this.f, JSON.stringify(datafile, null, 4));
            });




        }
    }


}

// var ocr={"f":process.env.IMG,"title":process.env.TITLE,"id":process.env.ID,"mode":"basic", "page":process.env.PAGE,"lan":process.env.LAN}
var ocr = {
    "f": "/data/src/personal/ebrain/src/server/data/ocr/abc.json",
    "img": "/data/src/personal/ebrain/src/server/data/abc.jpg",
    "title": "example",
    "id": "abddc",
    "typeocr": "standard",
    "page": "1",
    "lan": "en",
    "ocrengine": "baidu"
}




var ocraction= new Ocr(ocr)

// ocraction.ocrstandard()
ocraction.ocrtable()






// client.tableRecorgnize(base64, 'excel', 10000, 1000).then(function(result) {
//     console.log('<tableRecorgnize>: ' + JSON.stringify(result));
// }).catch(function(e) {
//     console.log(e)
// });



// function ocr_basic(ocr) {


//     var image = fs.readFileSync(ocr.f);
//     var base64Img = new Buffer(image).toString('base64');

//     const hash = md5File.sync(ocr.img)
//     console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
//     client.generalBasic(base64Img, data).then(function(result) {
//         console.log(JSON.stringify(result));

//         var myObj = result;

//         myObj.page = ocr.page;
//         myObj.title = ocr.title;
//         myObj.hash = hash;
//         datafile.push(myObj);

//         fs.writeFile(path.dirname(ocr.f) + '/' + title + '.json', JSON.stringify(datafile));

//     });


// }


// // var ocr={"f":process.env.IMG,"title":process.env.TITLE,"id":process.env.ID,"mode":"basic", "page":process.env.PAGE,"lan":process.env.LAN}
// var ocr = { "f": "/data/src/personal/ebrain/src/server/data/abc.jpg", "title": "example", "id": "fsfsdfsd34343", "mode": "excelasic", "page": "1", "lan": "en" }
// datafile = require(path.dirname(ocr.f) + '/' + +'.json')