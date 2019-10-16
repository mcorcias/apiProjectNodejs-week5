const http = require("http");
const port = 2000;

const router = require("./router");

const server = http.createServer(router);

server.listen(port);


console.log(`The server is running on port ${port}`);