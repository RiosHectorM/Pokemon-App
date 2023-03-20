const { Pokemon, Type } = require('../db');

const getDBData = async () => {
  const allPokeBD = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });
  return allPokeBD.map((poke) => {
    const pokemon = {
      id: poke.id,
      name: poke.name,
      image: poke.image,
      // hp: pokeData.data.stats[0].base_stat,
      // attack: pokeData.data.stats[1].base_stat,
      // defense: pokeData.data.stats[2].base_stat,
      // speed: pokeData.data.stats[5].base_stat,
      // height: pokeData.data.stats[5].base_stat,
      // weight: pokeData.data.stats[5].base_stat,
      types: poke.types,
    };
    return pokemon;
  });
};

module.exports = {
  getDBData,
};
