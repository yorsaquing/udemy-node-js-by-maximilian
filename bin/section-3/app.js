const http = require('http')
const requestHandler = require('./section-3/routes')
const server = http.createServer(requestHandler);

server.listen(3031)