//const http = require('http');
//const hostname = '127.0.0.1';
//const port = 3000;
//res.statusCode = 200;
//res.setHeader('Content-Type', 'text/html');
//res.end('<h1>prueba de nuestra pagina andando </h1><br></br><font color="red">pagina andando	</font>');
//});
//console.log(`Server running at http://${hostname}:${port}/`);
//});
var express = require('express');
var app = express();
app.get('/', function (req, res) {
res.send('Hello World!');
});
app.get('/02', function (req, res) {
res.send('Hello World example 2!');
});

app.listen(3000, function () {
console.log('Example app listening on port 3000!');
});