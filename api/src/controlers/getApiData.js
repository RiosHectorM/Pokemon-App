const { Pokemon, Types } = require('../db');
const axios = require('axios');

const pokeLoad = async (url) => {
  const pokeFromApi = await axios(url);
  return pokeFromApi.data;
};

const pokeNameUrl = async (pokeArray, pokeCant, resultApi) => {
  while (pokeArray.length < pokeCant) {
    pokeArray = pokeArray.concat(resultApi.results);
    resultApi = await pokeLoad(resultApi.next);
  }
  return pokeArray;
};

const getPokeApi = async () => {
  let pokeArray = [];
  const pokeCant = 20;
  let resultApi = await pokeLoad('https://pokeapi.co/api/v2/pokemon');

  pokeArray = await pokeNameUrl(pokeArray, pokeCant, resultApi);

  const pokemons = pokeArray.map(async (poke) => {
    const pokeData = await axios(poke.url).then((pokeData) => {
      const pokemon = {
        idPoke: pokeData.data.id,
        name: pokeData.data.name,
        image: pokeData.data.sprites.other.home.front_default,
        // hp: pokeData.data.stats[0].base_stat,
        // attack: pokeData.data.stats[1].base_stat,
        // defense: pokeData.data.stats[2].base_stat,
        // speed: pokeData.data.stats[5].base_stat,
        // height: pokeData.data.stats[5].base_stat,
        // weight: pokeData.data.stats[5].base_stat,
        types: pokeData.data.types?.map((p) => p.type.name),
      };
      return pokemon;
    });

    return pokeData;
  });
  return Promise.all(pokemons)
    .then((poke) => {
      console.log('Array Poke Promisses Resolve');
      return poke;
    })
    .catch((reason) => {
      console.log(reason);
      console.log('Array Poke Promisses Error');
    });
};

module.exports = {
  getPokeApi,
};
