const axios = require('axios');

const getPoke = async (Pokemon) => {
  try {
    let pokemonByParam = await axios(
      `https://pokeapi.co/api/v2/pokemon/${Pokemon}/`
    ).then((poke) => {
      const pokemon = {
        id: poke.data.id,
        name: poke.data.name,
        image: poke.data.sprites.other.home.front_default,
        hp: poke.data.stats[0].base_stat,
        attack: poke.data.stats[1].base_stat,
        defense: poke.data.stats[2].base_stat,
        speed: poke.data.stats[5].base_stat,
        height: poke.data.height,
        weight: poke.data.weight,
        types: poke.data.types?.map((p) => ({ name: p.type.name })),
      };
      return pokemon;
    });

    return pokemonByParam;
  } catch (error) {
    return [];
  }
};
module.exports = {
  getPoke,
};
