//libs
require('colors');
import {setHeaders} from './middlewares';
import express from 'express';
import bodyParser from 'body-parser';
import {ApolloServer} from 'apollo-server-express';
import sessionParams from './sessionParams';
//custom
import typeDefs from './graphql/typeDefs/user';
import resolvers from './graphql/resolvers/user';

const app = express();
const port = process.env.BACK;

app.use(setHeaders);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionParams);
app.use('/api', require('./routes/auth'));

//TODO: need to stitch > 2 typeDefs
// const allDefs = ;
// const allResolvers = ;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: port}, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
