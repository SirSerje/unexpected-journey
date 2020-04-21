import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import User from './models/user';
import { ProfileController } from './controllers/profile';
import { LogoutController } from './controllers/logout';
import { SignupController } from './controllers/signup';
import { LoginController } from './controllers/login';
import { isAdmin, isUser } from './middlewares/roles';
import { userSignupValidator, userSignInValidator } from './middlewares/validators';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const envConfig = dotenv.config();
if (envConfig.error) {
  console.log('.env file does not loaded');
  throw envConfig.error;
}

const app = express();
const MongoStore = connectMongo(session);
const swaggerDocument = YAML.load('./swagger.yaml');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(process.env.MONGO_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then((result) => {
  console.log(`MongoDB connection granted`);
}).catch(error => console.log(`There is troubles with connecting to MongoDB ${error}`));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('success connect');
});

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  }),
}));

const roleLoggerMiddleWare = async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    console.log('current user role:', user.role || 'unauthorized');
  } catch (err) {
    console.log('current user role:', 'unauthorized');

  }
  next();
};
//static content
app.use(express.static('src/view/public'));

app.post('/login', [roleLoggerMiddleWare, userSignInValidator], LoginController);
app.post('/signup', [roleLoggerMiddleWare, userSignupValidator], SignupController);
app.get('/logout', [roleLoggerMiddleWare], LogoutController);
app.get('/profile', [roleLoggerMiddleWare], ProfileController);


app.listen(process.env.NODE_PORT, () => console.log(`tracker running on port: ${process.env.NODE_PORT}`));
