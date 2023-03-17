const { Router } = require('express');
const { getTypes } = require('../controlers/getTypes.js');

//const { Type } = require('../db.js');
const router = Router();

router.get('/', async (req, res) => {
  const pokeTypes = await getTypes();
  res.json(pokeTypes);
});

module.exports = router;
