const axios = require('axios');

const pokeLoad = async (url) => {
  try {
    const pokeFromApi = await axios(url);
    return pokeFromApi.data;
  } catch (error) {
    return { error: 'No response from API' };
  }
};

const pokeNameUrl = async (pokeArray, pokeCant, resultApi) => {
  try {
    while (pokeArray.length < pokeCant) {
      pokeArray = pokeArray.concat(resultApi.results);
      resultApi = await pokeLoad(resultApi.next);
    }
    return pokeArray;
  } catch (error) {
    return { error: 'Error in map pokeArray' };
  }
};

const getPokeApi = async () => {
  try {
    let pokeArray = [];
    const pokeCant = 100;
    let resultApi = await pokeLoad('https://pokeapi.co/api/v2/pokemon');

    pokeArray = await pokeNameUrl(pokeArray, pokeCant, resultApi);

    const pokemons = pokeArray.map(async (poke) => {
      const pokeData = await axios(poke.url).then((pokeData) => {
        const pokemon = {
          id: pokeData.data.id,
          name: pokeData.data.name,
          image: pokeData.data.sprites.other.home.front_default,
          height: pokeData.data.height,
          weight: pokeData.data.weight,
          attack: pokeData.data.stats[1].base_stat,
          defense: pokeData.data.stats[2].base_stat,
          speed: pokeData.data.stats[5].base_stat,
          hp: pokeData.data.stats[0].base_stat,
          types: pokeData.data.types?.map((p) => ({ name: p.type.name })),
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
        console.log('Array Poke Promisses Error');
        return [];
      });
  } catch (error) {
    return { error: 'Error in Data Poke response' };
  }
};

module.exports = {
  getPokeApi,
};
