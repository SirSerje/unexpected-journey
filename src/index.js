require('colors')
import {setHeaders} from './middlewares'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import session from 'express-session'
import {ApolloServer} from 'apollo-server-express'

import typeDefs from './graphql/typeDefs/user'
import resolvers from './graphql/resolvers/user'


const MongoStore = require('connect-mongo')(session)
const app = express()
const port = process.env.PORT

//TODO: add FE authorization
//TODO: separate middleware

//enable cors stuff
app.use(setHeaders)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb+srv://q:q@cluster0-cpecu.gcp.mongodb.net/unexpected-journey', {useNewUrlParser: true})
const database = mongoose.connection
database.on('error', console.error.bind(console, 'connection error:'.red))
database.once('open', () => console.log('Successfully connected to MongoDB Atlas 🙌'.cyan))


const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen({ port: port}, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
)
