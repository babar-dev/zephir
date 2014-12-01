var http = require ('http');

var server = http.createServer(function(req, res) {
               console.log("Someone tried to connect.");
               res.writeHead(200);
               res.end("Hi.");
             });

server.listen(8080);