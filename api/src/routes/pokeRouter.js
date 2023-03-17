const { Router } = require('express');
//const { Pokemon, Type } = require('../db.js');
const { getPokeApi } = require('../controlers/getApiData.js');
const { getPokeID } = require('../controlers/getPokeID.js');

const router = Router();

router.get('/', async (req, res) => {
  const pokeArray = await getPokeApi();
  res.send(pokeArray);
});

router.get('/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params;
  const pokeForId = await getPokeID(idPokemon);
  res.send(pokeForId);
});

module.exports = router;
