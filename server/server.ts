import express, { Request, Response } from 'express';
import winston from 'winston'
import * as documentController from "./controllers/DocumentController";

process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';
const config = require('config');



let logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
      new winston.transports.Console({ level: 'info' }),
      new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});

const port: number = config.get('server.port');
console.log(`Application port: ${port}`);
const app: express.Application = express();
//const productRouter: express.Router = express.Router();
//const jsonParser = express.json();

//app.use((req: express.Request, res: express.Response, next) => {
  //logger.log('info', 'recevie request: ', { request: req });
//});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Server: hello!'); //to do return swagger contract
});

app.get('/Services', (req: express.Request, res: express.Response) => {
  res.send('Server: hello!'); //to do return swagger contract
});

// API Endpoints
app.get("/documents", documentController.allDocuments);
app.get("/document/:id", documentController.getDocument);
app.post("/document", documentController.addDocument);
app.put("/document/:id", documentController.updateDocument);
app.delete("/document/:id", documentController.deleteDocument)

app.listen(port, ()=>{
  logger.log('info', 'server is listening', { port: port });
  return console.log(`server is listening on ${port}`);
});


//if (process.env.NODE_ENV !== 'production') {
//  logger.add(new winston.transports.Console({
//    format: winston.format.simple(),
//  }));
//}