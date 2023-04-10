const axios = require('axios');

const evolution = async (evoData) => {
  try {
    const apiPokeUrl = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/' + evoData.species.name
    );

    let evoChain = [
      {
        name: evoData.species.name,
        img: apiPokeUrl.data.sprites.other['official-artwork'].front_default,
      },
    ];

    let currentPokemon = evoData;

    if (!currentPokemon.evolves_to || currentPokemon.evolves_to.length === 0) {
      return evoChain;
    }

    do {
      for (const pokemonEvolucion of currentPokemon.evolves_to) {
        const apiPokeUrl = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/' + pokemonEvolucion.species.name
        );

        let result = {
          name: pokemonEvolucion.species.name,
          img: apiPokeUrl.data.sprites.other['official-artwork'].front_default,
        };

        evoChain.push(result);

        if (pokemonEvolucion.evolves_to.length) {
          currentPokemon = pokemonEvolucion;
        } else {
          currentPokemon = null;
        }
      }
    } while (currentPokemon);
    return evoChain;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  evolution,
};
