const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    var chong = false;
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            chong = false;
            var obj = JSON.parse(body);
            fs.readFile('list.txt', 'utf8', (err, data) => {
                if (err) throw err;
                //console.log(data);
                const lines = data.split('\n');
                lines.forEach(line => {
                    const parts = line.split(' ');
                    if (parts.length === 2) {
                        const b = parts[1];
                        //console.log(obj.e);
                        //console.log(b);
                        if(obj.e === b){
                            chong = true;

                        }
                    }
                });
                //console.log(chong);
                if(chong){
                    res.write('抱歉，用户名已重复。由于服务器非正版可进，不允许重名。请换一个名字申请白名单。');//回传部分，没写好，明天继续写
                }else{
                    fs.appendFile('list.txt', obj.online + ' ' + obj.e + '\n', err => {
                        if (err) throw err;
                    });
                }
                res.end('');
            });
        });
    } else {
        res.end('Invalid request');
    }
});
console.log("opened");
server.listen(15146);
