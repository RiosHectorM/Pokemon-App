const axios = require('axios');

const evolution = async (evoData) => {
  try {
    let evoChain = [];

    do {
      const apiPokeUrl = await axios.get(
        'https://pokeapi.co/api/v2/pokemon/' + evoData.species.name
      );

      let result = {
        name: evoData.species.name,
        img: apiPokeUrl.data.sprites.other['official-artwork'].front_default,
      };

      evoChain.push(result);

      evoData = evoData['evolves_to'][0];
      
    } while (evoData && evoData.hasOwnProperty('evolves_to'));

    return evoChain;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  evolution,
};
