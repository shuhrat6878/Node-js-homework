const http = require('http');
const fs  = require('fs');
const path  =require('path');
const { userInfo } = require('os');

const PORT = 3000;

const server = http.createServer((req, res)=> {
    const method  = req.method
    const url = req.url;

    console.log('method:', method);
    console.log('url:',url);


    if(method === 'POST'){
        if(url === '/resume'){
            let body = '';
            req.on('data', (data)=>{
                body += data.toString();
            })

            req.on('end',()=>{
                console.log(body)
                console.log(body.split('&'));
                body.split('&').forEach((item)=>{
                    userInfo[item.split('=')[0] = item]
                })
                
            })
            res.end('ishladi')
            return;
        }
    }

    res.end('ishladi' );
})

server.listen(PORT, () => {
    console.log(`Server ${PORT} da ishga tushdi`);
});