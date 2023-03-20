const axios = require('axios');
const { Type } = require('../db.js');

const getTypes = async () => {
  try {
    let types = await axios('https://pokeapi.co/api/v2/type').then((type) => {
      let arrayTypes = type.data.results;
      arrayTypes = arrayTypes.map((t) => t.name);
      return arrayTypes;
    });
    types.forEach((type) => {
      Type.findOrCreate({
        where: {
          name: type,
        },
      });
    });
    return types;
  } catch (error) {
    return { error: 'No Types response from api' };
  }
};
module.exports = {
  getTypes,
};
