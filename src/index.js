import typeDefs from './typeDefs/user'
import resolvers from './resolvers/user'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT
require('colors')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const { ApolloServer } = require('apollo-server-express')

//TODO: add FE authorization
//TODO: separate middleware

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


const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)