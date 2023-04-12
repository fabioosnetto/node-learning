const http = require('http');
const fs   = require('fs');
const { Console } = require('console');
const { Server } = require('socket.io');
const { Socket } = require('dgram');

const io = new Server();

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res)=>{

   /*res.statusCode = 200;
   res.setHeader('Content-Type', 'text/plain');*/

   fs.readFile('index.html', (err, data)=>{
      const url = req.url;
      if(url == '/')
        {
         res.writeHead(200, {'Content-Type': 'text/html'});
         res.write(data);
         
         return res.end();
        }else{
         res.writeHead(404);
         return res.end(`Page (${url}) Not Found`)
        }
   })

});

io.on('connection', (socket)=>{
   console.log('User connected');
});

server.listen(port, hostname, ()=>{
   console.log('server works!')
});


function createFile(){
   fs.appendFile('text_000.txt', 'Test', (err)=>{
      if(err) { throw err; } else { console.log('Success!'); }
   })

   setTimeout(()=>{
      fs.open('text_000.txt', (err)=>{
         if(err) { throw err; } else { console.log('Success!'); }
      })
   }, 100)

   setTimeout(()=>{
      fs.close(0, (err)=>{
         if(err) { throw err; } else { console.log('Success!'); }
      })
   }, 3000)
}

createFile();