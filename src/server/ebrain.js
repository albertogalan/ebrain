var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// var bodyParser = require('body-parser');
// var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// var { makeExecutableSchema } = require('graphql-tools');

const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');
let port = 3000;

/* Here a simple schema is constructed using the GraphQL schema language (buildSchema). 
   More information can be found in the GraphQL spec release */

let schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }
`);


// Root provides a resolver function for each API endpoint
let root = {
    postTitle: () => {
        return 'Build a Simple GraphQL Server With Express and NodeJS';
    },
    blogTitle: () => {
        return 'scotch.io2';
    }
};




// var schema = makeExecutableSchema({typeDefs, resolvers});

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/graphiql', graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: true //Set to false if you don't want graphiql enabled
}));


// app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
// app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(port, () => console.log('Now browse to http://i487.lxc:' + port + '/graphiql'));




app.post('/ebrain/:method', function(req, res) {

console.log(req.body);

    method = req.params.method
    data = req.body
    console.log(req.body)

    ebrain = new Ebrain(method, data)

    switch (method) {

        case "sharelink":
            // Do something for "esc" key press.
            console.log('sharelink')
            ebrain.sharelink().then(function(aa) {
                console.log(aa)
                res.json(aa)


            })
            break;
        case "jieba":
            // Do something for "esc" key press.
            console.log('do it jieba')
            res.json(ebrain.jiebabrain())
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // res.json(obj)


});





class Ebrain {

    constructor(method, data) {
        this.method = method;
        this.data = data;
    }

    pop() {

        const value = 'hello';
        return value;
    }


    sharelink() {

        let PATHFILES = "/data/rw1/m1/"
        let PATHSHAREFILES = "/data/rw1/share/"
        let file = PATHFILES + this.data.url
        let outputfile = PATHSHAREFILES + this.hashFile(file)
        console.log('sharelink of :' + file);
        this.copyfile(file, outputfile)
        return this.hashFile(file)

    }


    jiebabrain() {
        let text = this.data.data
        var nodejieba = require("nodejieba");
        var result = nodejieba.cut(text);
        // console.log(result);
        return result

    }

    hashFile(file) {

        return new Promise(function(resolved, rejected)

            {

                let filename = file
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
                        let hashdata = `${hash.digest('hex')}`
                        // console.log(`${data.hash} ${file}`);
                        let obj = {}
                        obj.hash = hashdata
                        resolved(obj)
                    }
                });
            })
    }

    copyfile(file, target) {
        console.log(`copy ${file} ${target}`);

        var fs = require('fs-extra');
        fs.copySync(file, target);

    }



}





app.get('/book/:userid/:bookid', function(req, res) {
    var userid = req.params.userid
    var bookid = req.params.bookid
    data = req.query
    console.log(data.position)

    var fs = require('fs');
    var fileName = './data/collection.json';
    var collection = require(fileName);
    console.log(collection.userid)
    // search userid
    var user = collection.find(search => search.userid === userid)
    // search which book
    var book = user.books.find(search => search.bookid === bookid)
    book.position = 55


    // console.log(book)

    fs.writeFile(fileName, JSON.stringify(file), function(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(file, null, 2));
        console.log('writing to ' + fileName);
    });



    res.end();
});



var server = app.listen(8082, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})