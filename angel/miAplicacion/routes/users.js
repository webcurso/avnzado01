var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
var UsuarioModel = require('../models/usuario')
router.get('/', function (req, res, next) {
//Instanciar modelo con datos
var usuario = new UsuarioModel({
nombre: 'Fernando',
apellido: 'Andreassi',
edad: 41
});
console.log(usuario);

usuario.save(function (error, documento) {
if (error) {
return console.error(err);
} else {
console.log("Documento Guardado")
}
});
res.render('index', {title: 'Express'});
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

