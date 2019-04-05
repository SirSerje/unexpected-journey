//import sum from './modules/sum'

//console.log(`Hello, world ${sum(1, 2)} ${process.env.NODE_ENV}` )

/*
Connect to mongo server
MongoClient.connect('mongodb+srv://q:XXXXXX@cluster0-cpecu.gcp.mongodb.net/test?retryWrites=true',
  function (err, db) {
    if(!err) {
      console.log('We are connected')
    }
  })
*/

//Example of graph ql
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

let port = 3000;
const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
