const { createServer } =require('node:http');
const { read , write }  = require('./file.js');


const server = createServer(async(req, res)=> {
    if(req.method === "POST" && req.url === "/users") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const user = JSON.parse(body);
            await write(user);
            res.writeHead(201);
            res.end();
        });
    } else if(req.method === "GET" && req.url === "/users") {
        const users = await read();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } else {
        res.writeHead(404);
        res.end();
    }
});
