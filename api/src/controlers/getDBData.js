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
      hp: poke.hp,
      attack: poke.attack,
      defense: poke.defense,
      speed: poke.speed,
      height: poke.height,
      weight: poke.weight,
      created: poke.created,
      types: poke.types,
    };
    return pokemon;
  });
};

module.exports = {
  getDBData,
};
