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
  
  res.send(pokeArray);
});

module.exports = router;
