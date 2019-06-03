
var express = require('express');
var router = express.Router();
var UsuarioModel = require('../models/usuario')



/* GET users listing. */
router.get('/', function(req, res, next) {
	UsuarioModel.find({}, function(error, documentos){
		if(error){
			return console.error(err);
		}else{
			console.log(documentos)
			  res.render('listarUsuarios', { title: 'Usuarios', usuarios: documentos });
		}
	});
}); 

router.get('/nuevo/:nombre/:apellido/:edad', function(req, res, next) {
	//Instanciar modelo con datos
	var usuario = new UsuarioModel ({
		nombre: req.params.nombre,
		apellido: req.params.apellido,
		edad: req.params.edad
	});	

	usuario.save(function(error, documento){
		if(error){
			return console.error(err);
		}else{
			console.log("Documento Guardado")
		}
	});  
  res.send('<p>Usuario dado de alta</p><a href="/users">Usuarios</a>');
});

router.get('/modificar/:id/:nombre/:apellido/:edad', function(req, res, next) {
	//Instanciar modelo con datos
	UsuarioModel.findById(req.params.id, function(error, documento){
		if(error){
			return console.error(err);
		}else{
			var usuarioModificar = documento;
			usuarioModificar.nombre = req.params.nombre;
			usuarioModificar.apellido = req.params.apellido;
			usuarioModificar.edad = req.params.edad;	
			usuarioModificar.save(function(error, documento){
				if(error){
					return console.error(err);
				}else{
			console.log(usuarioModificar);
			console.log(documento);				}				
			});
		}
	});
  res.send('<p>Usuario dado de alta</p><a href="/users">listarUsuarios</a>');
});


router.get('/eliminar/:id', function(req, res, next) {
	//Instanciar modelo con datos
	UsuarioModel.remove({_id: req.params.id}, function(error, documento){
		if(error){
			return console.error(error);
		}else{
			console.log('Usuario eliminado');
		}
	});
  res.send('<p>Usuario Eliminado</p><a href="/users">Usuarios</a>');
});

module.exports = router;

