const axios = require('axios');
const { evolution } = require('./getEvolution');

const getPoke = async (id) => {
  try {
    const apiPokeUrl = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const results = apiPokeUrl.data;
    const apiPokeSpecie = await axios.get(results.species.url);
    const speciesresult = apiPokeSpecie.data;
    const pokeEvolution = await axios.get(speciesresult['evolution_chain'].url);

    const pokemon = {
      id: results.id,
      name: results.name,
      image: results.sprites.other.home.front_default,
      hp: results.stats[0].base_stat,
      attack: results.stats[1].base_stat,
      defense: results.stats[2].base_stat,
      speed: results.stats[5].base_stat,
      height: results.height,
      weight: results.weight,
      evolution: await evolution(pokeEvolution.data.chain),
      types: results.types?.map((p) => ({ name: p.type.name })),
    };
    return pokemon;
  } catch (error) {
    return [];
  }
};

module.exports = {
  getPoke,
};
