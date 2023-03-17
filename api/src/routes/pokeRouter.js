const { Router } = require('express');
//const { Pokemon, Type } = require('../db.js');
const axios = require('axios');
const { getPokeApi } = require('../controlers/getApiData.js');

const router = Router();

const pokeLoad = async (url) => {
  const pokeFromApi = await axios(url);
  return pokeFromApi.data;
};

router.get('/', async (req, res) => {
  let pokeArray = [];
  const pokeCant = 60;
  let resultApi = await pokeLoad('https://pokeapi.co/api/v2/pokemon');

  while (pokeArray.length < pokeCant) {
    pokeArray = pokeArray.concat(resultApi.results);
    resultApi = await pokeLoad(resultApi.next);
  }
  console.log(pokeArray.length);
  pokeArray.map(async (poke) => {
    const pokeData = await axios(poke.url);
    const pokemon = {
      idPoke: pokeData.data.id,
      name: pokeData.data.name,
      image: pokeData.data.sprites.other.home.front_default,
      hp: pokeData.data.stats[0].base_stat,
      attack: pokeData.data.stats[1].base_stat,
      defense: pokeData.data.stats[2].base_stat,
      speed: pokeData.data.stats[5].base_stat,
      height: pokeData.data.stats[5].base_stat,
      weight: pokeData.data.stats[5].base_stat,
      types: [
        pokeData.data.types[0].type.name,
        pokeData.data.types[1]?.type.name,
      ],
    };
    console.log(pokemon);
  });

  res.send(pokeArray);
});

module.exports = router;
