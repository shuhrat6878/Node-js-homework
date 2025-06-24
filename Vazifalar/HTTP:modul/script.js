const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'products.json');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/products') {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }

    else if (req.url.startsWith('/products/')) {
      const id = parseInt(req.url.split('/')[2]);
      const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const product = products.find(p => p.id === id);

      if (product) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product not found' }));
      }
    }

    else {
      res.writeHead(404);
      res.end('Not found');
    }
  }

  else if (req.method === 'POST' && req.url === '/products') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const newProduct = JSON.parse(body);
      const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;

      products.push(newProduct);

      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newProduct));
    });
  }

  else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(5500, () => {
  console.log('Server is running on port 5500');
});
