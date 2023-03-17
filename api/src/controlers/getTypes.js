const axios = require('axios');

const getTypes = async () => {
  try {
    let types = await axios('https://pokeapi.co/api/v2/type').then((type) => {
      let arrayTypes = type.data.results;
      arrayTypes = arrayTypes.map((t) => t.name);
      return arrayTypes;
    });
    return types;
  } catch (error) {
    return { error: 'No Types response from api' };
  }
};
module.exports = {
  getTypes,
};
