var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/formulario', function(req, res, next) {
  console.log(req.params.user)
  res.render('mision', { title: 'esta es nuestra mision' });
});


module.exports = router;
