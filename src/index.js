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
const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema.js')




const port = process.env.PORT
const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NAME === 'dev',
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  })
}))

app.use('/posts', graphqlHTTP({
  schema: schema,

  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  })
}))

app.listen(port)
console.log('GraphQL API server running at localhost:' + port)
