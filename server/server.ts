import express from 'express';
import config from 'config'
import winston from 'winston'

let logger: winston.Logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
      new winston.transports.Console({ level: 'info' }),
  ],
});

const port: number = config.get('server.port');
const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Server: hello!');
});
app.listen(port, ()=>{
  logger.log('info', 'server is listening', { port: port });
  return console.log(`server is listening on ${port}`);
});
