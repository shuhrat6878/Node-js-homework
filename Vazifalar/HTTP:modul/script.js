const { createServer } =require('node:http');

const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({
        message: 'salom bu  mening birinchi serverim'
    }));
    res.end();
 });

server.listen(3000, () => console.log('server 3000 portda ishga tushdi'))


