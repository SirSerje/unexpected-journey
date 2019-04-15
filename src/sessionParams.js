//session params
import database from './database';

const MongoStore = require('connect-mongo')(session);

import session from 'express-session';

const sessionParams = session({
  secret: 'THIS_SECRET_SHOULD_BE_SAVED',
  resave: false,
  cookie: { maxAge: 14400 },
  expires:true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: database
  })
});

export default sessionParams;
