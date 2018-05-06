var express = require('express');
var app = express();
var fs = require("fs");

const PATHFILES = "/data/rw1/m1/"
const PATHSHAREFILES="/data/rw1/share/"

app.get('/ebrain', function(req, res) {

    // data = '{"url":"test.html"}';
    // data = JSON.parse(data);
    let data = {}
    data.url = req.query.url
    console.log('sharelink');
    data.file = PATHFILES + data.url



    hashFile(data).then(function(resp) {

        console.log(PATHFILES + data.url + data.hash)
        copyfile(PATHFILES+resp.url,PATHSHAREFILES+resp.hash)

        res.end(JSON.stringify(resp))

    })



})



var server = app.listen(8082, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})

function hashFile(data) {

    return new Promise(function(resolved, rejected)

        {

            filename = data.file
            console.log(filename)

            // const filename = process.argv[2];
            const crypto = require('crypto');
            const fs = require('fs');

            const hash = crypto.createHash('sha256');

            const input = fs.createReadStream(filename);
            input.on('readable', () => {
                const data2 = input.read();
                if (data2)
                    hash.update(data2);
                else {
                    data.hash = `${hash.digest('hex')}`
                    console.log(`${data.hash} ${data.url}`);
                    resolved(data)
                }
            });
        })
}

function copyfile(file, target) {
                    console.log(`copy ${file} ${target}`);

    var fs = require('fs-extra');
    fs.copySync(file, target);


}