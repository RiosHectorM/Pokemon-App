const { Router } = require('express');
//const { Type } = require('../db.js');
const router = Router();

router.get('/', function (req, res) {
  res.send('TYPESSSSSSSSSS');
});

module.exports = router;