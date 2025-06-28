const { createServer } = require('http');
const { existsSync, mkdirSync} = require('node:fs');
const { join } = require('node:path');
const { formidable }= require('formidable');

const PORT = 3000;

const uploadDir = join(__dirname, 'uploads');

if (!existsSync('uploadDir')) {
    mkdirSync(uploadDir,{ recursive: true });
}

const server  = createServer((req, res )=>{
    if( req.method === 'POST' && req.url === '/upload') {
        const form = formidable({ uploadDir, keepExtensions: true });

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error processing file upload');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ fields, files }));
        });
    }

});

server.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));