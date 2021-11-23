const http = require('http');
const app = require('./app');

const server = http.createServer(app);
server.listen(2000, console.log('server is running on port 2000'))