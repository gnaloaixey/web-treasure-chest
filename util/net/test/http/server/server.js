let http = require('http')

http.createServer((req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.end("haha")
}).listen(8080)