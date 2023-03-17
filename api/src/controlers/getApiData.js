const { Pokemon, Types } = require('../db');
const axios = require('axios');

const getPokeApi = async () => {
  const pokemons = await axios('https://pokeapi.co/api/v2/pokemon');

  return pokemons;
};

module.exports = {
  getPokeApi,
};
