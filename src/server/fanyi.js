// https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm
var express = require('express');
var app = express();
var fs = require("fs");

request = require('request')
var hepburn = require("hepburn");


var romaji1 = hepburn.fromKana("ひらがな");

app.get('/fanyi', function(req, res) {

    data = '{"from":"auto","to":"auto","src":"hola","dst":"你问的"}';
    data = JSON.parse(data);
    data.from = req.query.from
    data.to = req.query.to
    data.src = req.query.src
    data.i = req.query.i

    console.log(data.src);


    translate(data).then(function(resp) {
        console.log('this is resp' + JSON.stringify(resp))
        return scrap_handi(resp, data.src)
    }).then(function(resp2) {

        data.translate = resp2.translate;
        data.pinyin = resp2.pinyin;
        data.handi = resp2.handi
        var texto = encodeURI(data.src);
        data.audio = '<audio id="dictVoice" src="http://fanyi.baidu.com/gettts?lan=' + data.from + '&amp;text=' + texto + '&amp;spd=5&amp;source=web" autoplay="" controls="" volume="0.8">This is audio</audio>';
        data.audio = 'http://fanyi.baidu.com/gettts?lan=' + data.from + '&text=' + texto + '&spd=5&source=web';
        console.log(data.src + ' : ' + data.translate);
        aa=new Date().toString();
        writetodisk(data)
        res.json(data)
    })
})



var server = app.listen(8081, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})

function translate(json) {

    return new Promise(function(resolved, rejected)

        {

            var
                md5 = require('md5'),
                appid = '20171026000090895',
                key = 'S2K2rKGRjudMRY4ZFUPI',
                salt = (new Date).getTime(),
                query = json.src,
                str1 = appid + query + salt + key,
                sign = md5(str1)

            var headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
                "content-type": "application/json"

            }
            var data = {
                q: query,
                appid: appid,
                salt: salt,
                from: json.from,
                to: json.to,
                sign: sign
            };

            var options = {
                url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
                method: "GET",
                headers: headers,
                timeout: 4000,
                json: true,
                qs: data

            }


            function pinyin(json) {


                try {
                    var pinyin = require("node-pinyin");
                    // var re = /[a-z]/g;
                    // var issearch = query.search(re);
                    // console.log(json)

                    if (query.length < 22 && json.to == 'en') {
                        // console.log(pinyin(query).toString().replace(/,/g, ' '));
                        return pinyin(query).toString().replace(/,/g, ' ')
                    }

                    if (query.length < 65 && json.to == 'zh') {
                        // console.log(pinyin(json.trans_result[0].dst).toString().replace(/,/g, ' '));
                        return pinyin(json.trans_result[0].dst).toString().replace(/,/g, ' ')
                    }
                    if (json.to == 'jp') {
                        // console.log(hepburn.fromKana(json.trans_result[0].dst));
                        return hepburn.fromKana(json.trans_result[0].dst)
                    }

                } catch (err) {
                    console.log(err)
                }

            }




            // var url="http://berchtold-metallbau.de/kontakt/"
            // var url="http://pritty.com.cn/en/contact/how-to-contact.html"
            // console.log(parse(url));





            request(options, function callback(error, response, body, query) {
                if (!error && response.statusCode == 200) {
                    // console.log('callback')
                    // console.log(body.trans_result[0].dst)
                    var resp = {}
                    // resp.total=pinyin(body) + '</br>'+ body.trans_result[0].dst 
                    resp.pinyin = pinyin(body)
                    if (body.trans_result == undefined)
                    resp.translate='undefined'
                    else 
                    resp.translate = body.trans_result[0].dst
                    // console.log(resp)
                    // writetodisk(body)
                    // console.log(body.from)
                    resolved(resp)
                } else

                    console.log(error)

            });




        })
}

function writetodisk(body) {

    var fs = require('fs')
    d = new Date()
    fs.appendFile('/var/log/fanyi.log', d.toString() + ';' + body.src + ';' + body.translate + '\n', (err) => {
        if (err) throw err;
        // console.log('The "data to append" was appended to file!');
    });

}



function scrap_handi(resp, src) {
    return new Promise(function(resolved, rejected)

        {

            try {


                let headers = {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
                    'Accept': 'text/html',
                    'Accept-Language': 'en,zh',

                }
                let url = encodeURI("http://hanyu.baidu.com/s?wd=" + src + "&ptype=zici")

                let request = require('request'),
                    cheerio = require('cheerio'),
                    http = require("http");

                var jsonres = request({
                    url: url,
                    method: "GET",
                    headers: headers,
                    timeout: 25000
                }, function(error, response, body) {
                    var $ = cheerio.load(body)
                    // console.log($('dt').length)  

                    // console.log($('h2 strong').text() + ' ' + $('h2 b').text() + ' ' + $($('dt')[1]).text()  )
                    // $('dd p').each(function() {
                    //     var f = $(this).text();
                    //     console.log(f)
                    // });
                    let str = $('#fanyi-wrapper .tab-content').text()
                    // console.log(str + ' ' + $('#baike-wrapper .tab-content').text() + ' ' + $($('dt')[1]).text())
                    // let aaa=resp +'</br><div class="hanyu"><a href="http://hanyu.baidu.com/s?wd=' + src + '" >hanyu</a>'+str+'</div>'
                    resp.handi = '</br><div class="hanyu"><a href="http://hanyu.baidu.com/s?wd=' + src + '" >hanyu</a>' + str + '</div>'
                    resolved(resp)
                });

            } catch (err) {
                resp.handi = '</br><div class="hanyu"><a href="http://hanyu.baidu.com/s?wd=' + src + '" >hanyu</a>'
                resolved(resp)
                console.log('There is an error try next time')
                // Handle the error here.
            }
        });

}