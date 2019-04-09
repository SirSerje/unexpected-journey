//к сожалению, пока все лежит в одном файле, но я разнесу это
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()
const PORT = 3892

const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect(
  'mongodb+srv://q:q@cluster0-cpecu.gcp.mongodb.net/unexpected-journey',
  {useNewUrlParser: true}
)
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => console.log('successfully connected'))

//use sessions for tracking logins
app.use(session({
  secret: 'THIS_SECRET_SHOULD_BE_SAVED',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))

app.use('/api', require('./routes/auth'))

const index = app.listen(PORT, function () {
  console.log('app running on port.', PORT)
})
//-------- end of mongo manipulations

//Example of graph ql
// const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js');

let port = 3000;
// const app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
