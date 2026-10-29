const http = require('http')
const server = http.createServer((req,res) => {
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write("<h1>This is my Node JS Project</h1>")
    res.write("<h2>This is my Line Number 2</h2>")
    res.write("<p>This is my Paragraph</p>")
    res.end()
}).listen(3001,() => console.log("Open http://localhost:3001"))