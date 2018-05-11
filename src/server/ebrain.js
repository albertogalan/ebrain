var express = require('express');
var app = express();
var fs = require("fs");


// var bodyParser = require('body-parser');
// var { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// var { makeExecutableSchema } = require('graphql-tools');

const PATHFILES = "/data/rw1/m1/"
const PATHSHAREFILES="/data/rw1/share/"

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


app.use('/graphiql', graphqlHTTP({
  schema: schema,
  // rootValue: root,
  graphiql: true //Set to false if you don't want graphiql enabled
}));


// app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
// app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(port, () => console.log('Now browse to http://i487.lxc:'+port+'/graphiql'));




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


app.get('/book/:userid/:bookid', function (req, res) {
    var userid=req.params.userid
    var bookid=req.params.bookid
    data = req.query
    console.log(data.position)

    var fs = require('fs');
    var fileName = './data/collection.json';
    var collection = require(fileName);
    console.log(collection.userid)
    // search userid
    var user=collection.find(search => search.userid === userid)
    // search which book
    var book=user.books.find(search => search.bookid === bookid)
    book.position=55


    // console.log(book)

fs.writeFile(fileName, JSON.stringify(file), function (err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file,null,2));
  console.log('writing to ' + fileName);
});



  res.end();
});



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
