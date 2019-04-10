//к сожалению, пока все лежит в одном файле, но я разнесу это
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT
require('colors')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(
  'mongodb+srv://q:q@cluster0-cpecu.gcp.mongodb.net/unexpected-journey',
  {useNewUrlParser: true}
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'.red))
db.once('open', () => console.log('successfully connected'.cyan))

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

app.use('/graph', graphqlHTTP({
  schema: schema,
  graphiql: process.env.NAME === 'dev',
  formatError: error => ({
    message: error.message,
    locations: String(error.locations).red,
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

app.listen(port, function () {
  console.log('app running on port.', port)
})