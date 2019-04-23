//libs
require('colors');
import {setHeaders} from './middlewares';
import express from 'express';
import bodyParser from 'body-parser';
import {ApolloServer} from 'apollo-server-express';
import sessionParams from './sessionParams';
//custom
import finalSchema from './graphql';

const app = express();
const port = process.env.BACK;

app.use(setHeaders);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionParams);
app.use('/api', require('./routes/auth'));

const server = new ApolloServer({schema: finalSchema});
server.applyMiddleware({ app });

app.listen({ port: port}, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);
