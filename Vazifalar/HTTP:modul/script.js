const { createServer } =require('node:http');

const server = createServer((req, res) => {
    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            message: 'salom bu  mening birinchi serverim'
        }));
        res.end();
    }else if (req.method === 'POST' && req.url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({
                message: 'salom bu mening birinchi serverim',
                data: JSON.parse(body)
            }));
            res.end();
        });
    }else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            message: 'Not Found'
        }));
        res.end();
    }
});

server.listen(3000, () => console.log('server 3000 portda ishga tushdi'))


