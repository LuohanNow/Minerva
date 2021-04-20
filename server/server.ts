import express, { Request, Response } from 'express';
import winston from 'winston'
import * as documentController from "./controllers/DocumentController";
import * as userController from "./controllers/UserController";
import mongoose = require("mongoose");
import { NativeError } from "mongoose";
import * as dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { User, UserDocument } from "./models/user";
import passportLocal from "passport-local";

///process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
//const config = require('config');

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  //origin: API_URL,
  preflightContinue: false,
};


dotenv.config({ path: __dirname+'/.env' });

const uri: any =  process.env.DB_CONN; //config.get('database.uri');


mongoose.connect(uri,  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }) //why last is false?
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


let logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

const port: any = process.env.PORT;//config.get('server.port');
console.log(`Application port: ${port}`);
const app: express.Application = express();
//const productRouter: express.Router = express.Router();
//const jsonParser = express.json();

//app.use((req: express.Request, res: express.Response, next) => {
  //logger.log('info', 'recevie request: ', { request: req });
//});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));

app.use(session({ // or session in mongo?
  //name: 'session-id',
  secret: '123-456-789', // move to .env 
  saveUninitialized: false,
  resave: false
}));

const LocalStrategy = passportLocal.Strategy;


passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err: NativeError, user: UserDocument) => {
      done(err, user.id);
  });
});

passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
      if (err) { return done(err); }
      if (!user) {
          return done(undefined, false, { message: `Email ${email} not found.` });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (err) { return done(err); }
          if (isMatch) {
              return done(undefined, user);
          }
          return done(undefined, false, { message: "Invalid email or password." });
      });
  });
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Server: hello!'); //to do return swagger contract
});

app.get('/Services', (req: express.Request, res: express.Response) => {
  res.send('Server: hello!'); //to do return swagger contract
});

// Document API Endpoints
app.get("/documents", documentController.allDocuments);
app.get("/documentsbytag", documentController.allDocumentsByTag);
app.get("/tags", documentController.allTags);
app.get("/document/:id", documentController.getDocument);
app.post("/document", documentController.addDocument);
app.post("/search", documentController.searchText);
app.put("/document/:id", documentController.updateDocument);
app.delete("/document/:id", documentController.deleteDocument)

// UserLogin API Endpoints:
app.post("/signup", userController.signUp);
app.post("/login", userController.logIn);
app.post("/logout", userController.logOut);

app.listen(port, ()=>{
  logger.log('info', 'server is listening', { port: port });
  return console.log(`server is listening on ${port}`);
});


//if (process.env.NODE_ENV !== 'production') {
//  logger.add(new winston.transports.Console({
//    format: winston.format.simple(),
//  }));
//}