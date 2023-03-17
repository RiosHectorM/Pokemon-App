const { Router } = require('express');
//const { Pokemon, Type } = require('../db.js');
const { getPokeApi } = require('../controlers/getApiData.js');
const { getPoke } = require('../controlers/getPoke.js');

const router = Router();

router.get('/', async (req, res) => {
  const { name } = req.query;
  if (name) {
    const pokeForName = await getPoke(name.toLowerCase());
    res.send(pokeForName);
  } else {
    const pokeArray = await getPokeApi();
    res.send(pokeArray);
  }
});

router.get('/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params;
  const pokeForId = await getPoke(idPokemon);
  res.send(pokeForId);
});

router.post('/')

module.exports = router;
