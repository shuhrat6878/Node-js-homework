const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'fruits.json');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {

    if (req.url === '/') {
      const data = fs.readFileSync(filePath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    }

    else if (req.url.startsWith('/fruits/')) {
      const id = parseInt(req.url.split('/')[2]);
      const fruits = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const fruit = fruits.find(f => f.id === id);

      if (fruit) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(fruit));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Fruit bosh' }));
      }
    }

    else {
      res.writeHead(404);
      res.end('Not found');
    }
  }

  else if (req.method === 'POST' && req.url === '/fruits') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newFruit = JSON.parse(body);
      const fruits = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      newFruit.id = fruits.length ? fruits[fruits.length - 1].id + 1 : 1;
      fruits.push(newFruit);

      fs.writeFileSync(filePath, JSON.stringify(fruits, null, 2));
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newFruit));
    });
  }

  else if (req.method === 'PUT' && req.url.startsWith('/fruits/')) {
    const id = parseInt(req.url.split('/')[2]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updatedFruit = JSON.parse(body);
      let fruits = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const index = fruits.findIndex(f => f.id === id);

      if (index !== -1) {
        fruits[index] = { ...fruits[index], ...updatedFruit, id };
        fs.writeFileSync(filePath, JSON.stringify(fruits, null, 2));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(fruits[index]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Fruit bosh' }));
      }
    });
  }

  else if (req.method === 'DELETE' && req.url.startsWith('/fruits/')) {
    const id = parseInt(req.url.split('/')[2]);
    let fruits = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const index = fruits.findIndex(f => f.id === id);

    if (index !== -1) {
      const deleted = fruits.splice(index, 1);
      fs.writeFileSync(filePath, JSON.stringify(fruits, null, 2));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deleted[0]));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Fruit bosh' }));
    }
  }

  else {
    res.writeHead(404);
    res.end('not found');
  }
});

server.listen(3000, () => {
  console.log('Server 3000  porta ulandi');
});
