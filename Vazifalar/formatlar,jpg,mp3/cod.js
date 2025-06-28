const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { formidable } = require('formidable');

const uploadsPath = path.join(__dirname, 'uploads');
const imagesPath = path.join(uploadsPath, 'images');
const videosPath = path.join(uploadsPath, 'videos');

for (let folder of [imagesPath, videosPath]) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
}

const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.mp4': 'video/mp4',
    '.mov': 'video/quicktime',
    '.avi': 'video/x-msvideo'
};

function isImage(ext) {
    return ['.jpg', '.jpeg', '.png'].includes(ext);
}
function isVideo(ext) {
    return ['.mp4', '.mov', '.avi'].includes(ext);
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        const form = formidable({ multiples: false });

        form.parse(req, (err, _, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: err.message }));
            }

            const file = files.file?.[0];
            if (!file) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Fayl yuborilmadi' }));
            }

            const ext = path.extname(file.originalFilename).toLowerCase();
            let targetDir;

            if (isImage(ext)) targetDir = imagesPath;
            else if (isVideo(ext)) targetDir = videosPath;
            else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Yaroqsiz fayl turi' }));
            }

            const targetPath = path.join(targetDir, file.originalFilename);
            fs.renameSync(file.filepath, targetPath);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Yuklandi', filename: file.originalFilename }));
        });
    }

    else if (req.method === 'GET' && req.url.startsWith('/media/')) {
        const parts = req.url.split('/');
        const type = parts[2];
        const filename = parts[3];

        const filePath = path.join(uploadsPath, type, filename);
        const ext = path.extname(filename).toLowerCase();

        if (!fs.existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Fayl topilmadi' }));
        }

        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    }

    else if (req.method === 'GET' && req.url === '/gallery') {
        const images = fs.readdirSync(imagesPath);
        const videos = fs.readdirSync(videosPath);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            images,
            videos
        }));
    }

    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

server.listen(3000, () => {
    console.log('Server 3000-portda ishga tushdi');
});
