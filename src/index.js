//к сожалению, пока все лежит в одном файле, но я разнесу это
import { GraphQLObjectType } from 'graphql'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT
require('colors')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//enable cors stuff
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3891')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(
  'mongodb+srv://q:q@cluster0-cpecu.gcp.mongodb.net/unexpected-journey',
  {useNewUrlParser: true}
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'.red))
db.once('open', () => console.log('Successfully connected to MongoDB Atlas 🙌'.cyan))

//use sessions for tracking logins
app.use(session({
  secret: 'THIS_SECRET_SHOULD_BE_SAVED',
  resave: false,
  cookie: { maxAge: 14400 },
  expires:true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))

app.use('/api', require('./routes/auth'))

//-------- end of mongo manipulations

//Example of graph ql
const graphqlHTTP = require('express-graphql')
const schema = require('./schema.js')

app.use('/graph', graphqlHTTP((req, res, next) => {
  //TODO: this solution is not right, we need to fix it
  console.log(req.session)
  if(!req.session.userId){
    return { schema:new GraphQLObjectType({
      name:'access denied. try to login and make request'
    }) }
  }

  return {
    schema: schema,
    graphiql: process.env.NAME === 'dev',
    formatError: error => ({
      message: error.message,
      locations: String(error.locations).red,
      stack: error.stack ? error.stack.split('\n') : [],
      path: error.path
    })
  }}))

app.use('/posts', graphqlHTTP({
  schema: schema,

  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  })
}))

app.listen(port, function () {
  console.log('app running on port.', port)
})