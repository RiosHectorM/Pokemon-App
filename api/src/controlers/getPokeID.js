const { default: axios } = require('axios');

const getPokeID = async (idPokemon) => {
  try {
    let pokemonByID = await axios(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`
    ).then((poke) => {
      const pokemon = {
        idPoke: poke.data.id,
        name: poke.data.name,
        image: poke.data.sprites.other.home.front_default,
        hp: poke.data.stats[0].base_stat,
        attack: poke.data.stats[1].base_stat,
        defense: poke.data.stats[2].base_stat,
        speed: poke.data.stats[5].base_stat,
        height: poke.data.stats[5].base_stat,
        weight: poke.data.stats[5].base_stat,
        types: poke.data.types?.map((p) => p.type.name),
      };
      return pokemon;
    });
    return pokemonByID;
  } catch (error) {
    return { error: 'Pokemon NO EXISTE' };
  }
};

module.exports = {
  getPokeID,
};
