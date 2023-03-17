const { Pokemon, Types } = require('../db');
const axios = require('axios');

const getPokeApi = async () => {
  const pokemons = await axios('https://pokeapi.co/api/v2/pokemon');

  // const mapUrl = await pokemons.data.results.map((e) => {
  //   return e.url;
  // });
  // var arrayPokemones = [];
  // for (var i = 0; i < mapUrl.length; i++) {
  //   const url = await axios(mapUrl[i]);
  //   arrayPokemones.push({
  //     idPoke: url.data.id,
  //     name: url.data.name,
  //     height: url.data.height,
  //     weight: url.data.weight,
  //     hp: url.data.stats.find((e) => e.stat.name === 'hp').base_stat,
  //     attack: url.data.stats.find((e) => e.stat.name === 'attack').base_stat,
  //     defense: url.data.stats.find((e) => e.stat.name === 'defense').base_stat,
  //     speed: url.data.stats.find((e) => e.stat.name === 'speed').base_stat,
  //     types: url.data.types.map((e) => (e = { name: e.type.name })),
  //     // img: url.data.sprites.versions['generation-v']['black-white'].animated.front_default,
  //     img: url.data.sprites.other['official-artwork'].front_default,
  //   });
  //}
  return pokemons;
};

module.exports = {
  getPokeApi,
};
