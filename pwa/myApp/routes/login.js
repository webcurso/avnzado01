var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', {});
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	if(req.body.username == 'test' && req.body.password == 'test'){
		req.session.username = req.body.username
	}
  res.redirect('users/');
});

module.exports = router;
