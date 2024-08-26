require ('dotenv').config();
const http=require('http');
const app = require('./src/index');
const server = http.createServer(app);
server.listen(process.env.PORT);
