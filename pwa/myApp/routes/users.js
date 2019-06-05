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
			  res.render('usuarios', { title: 'Usuarios', usuarios: documentos, usuarioLogueado: req.session.username });
		}
	});
});

router.get('/api/', function(req, res, next) {
	UsuarioModel.find({}, function(error, documentos){
		if(error){
			return console.error(err);
		}else{
			console.log(documentos)
			  res.send(200, documentos);
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
			return console.error(error);
		}else{
			console.log("Documento Guardado")
		}
	});  
  res.send('<p>Usuario dado de alta</p><a href="/users">Usuarios</a>');
});

router.post('/api/nuevo', function(req, res, next) {
	//Instanciar modelo con datos
	var usuario = new UsuarioModel ({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		edad: req.body.edad
	});	

	usuario.save(function(error, documento){
		if(error){
			return console.error(error);
		}else{
  			res.send(`El usuario ${documento.nombre} ${documento.apellido} ha sido dado de alta con el ID: ${documento._id}`);
		}
	});  
});

router.get('/modificar/:id/:nombre/:apellido/:edad', function(req, res, next) {
	//Instanciar modelo con datos
	UsuarioModel.findById(req.params.id, function(error, documento){
		if(error){
			return console.error(error);
		}else{
			var usuarioModificar = documento;
			usuarioModificar.nombre = req.params.nombre;
			usuarioModificar.apellido = req.params.apellido;
			usuarioModificar.edad = req.params.edad;	
			usuarioModificar.save(function(error, documento){
				if(error){
					return console.error(error);
				}else{
			console.log(usuarioModificar);
			console.log(documento);				}				
			});
		}
	});
  res.send('<p>Usuario dado de alta</p><a href="/users">Usuarios</a>');
});

router.put('/api/modificar', function(req, res, next) {
	//Instanciar modelo con datos
				console.log(req.body);

	UsuarioModel.findById(req.body.id, function(error, documento){
		if(error){
			return console.error(error);
		}else{
			var usuarioModificar = documento;
			usuarioModificar.nombre = req.body.nombre;
			usuarioModificar.apellido = req.body.apellido;
			usuarioModificar.edad = req.body.edad;	
			usuarioModificar.save(function(error, documento){
				if(error){
					return console.error(error);
				}else{
				console.log(usuarioModificar);
				console.log(documento);		
				  res.send('El usuario ha sido modificado');
				}				
			});
		}
	});
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

router.delete('/api/eliminar/:id', function(req, res, next) {
	//Instanciar modelo con datos
	console.log(req.params)
	UsuarioModel.remove({_id: req.params.id}, function(error, documento){
		if(error){
			return console.error(error);
		}else{
			console.log('Usuario eliminado');
		}
	});
  res.send('Usuario Eliminado');
});
module.exports = router;
