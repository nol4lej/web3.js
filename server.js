const fs = require('fs');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const { url } = req;
    let contentType;
  
    if (url.endsWith('.html')) {
      contentType = 'text/html';
    } else if (url.endsWith('.js')) {
      contentType = 'application/javascript'; // Cambiado a 'application/javascript'
    } else {
      contentType = 'text/plain';
    }
  
    res.setHeader('Content-Type', contentType);
  
    fs.readFile(`.${url}`, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading file');
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  