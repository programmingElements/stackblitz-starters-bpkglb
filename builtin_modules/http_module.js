const http = require('http');

const myserver = http.createServer((request, response) => {
  response.write('Welcome To NodeJs Server Tutorials');
  response.end();
});

myserver.listen(5500);
