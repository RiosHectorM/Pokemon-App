import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  SEARCH_POKEMON,
  GET_TYPES,
  POST_POKEMON,
  FILTER,
  ORDER,
} from './types.js';

export const getAllPokemons = () => {
  return async function (dispatch) {
    return fetch('http://localhost:3001/pokemons')
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: json,
        })
      );
  };
};

export const getPokemonDetails = (id) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: GET_POKEMON_DETAILS,
          payload: json,
        })
      );
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/types`)
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: GET_TYPES,
          payload: json,
        })
      );
  };
};

export const postPokemon = (values) => {
  const input = {
    name: values.name,
    types: [values.types],
    image: values.image,
    hp: values.hp,
    attack: values.attack,
    defense: values.defense,
    speed: values.speed,
    height: values.height,
    weight: values.weight,
  };
  return async function (dispatch) {
    return fetch('http://localhost:3001/pokemons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: POST_POKEMON,
          payload: json,
        })
      );
  };
};

export const searchByName = (name) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/pokemons?name=${name}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        dispatch({
          type: SEARCH_POKEMON,
          payload: json,
        });
      });
  };
};

// export function filterCards(status) {
//   return {
//     type: FILTER,
//     payload: status,
//   };
// }

// export function orderCards(id) {
//   return {
//     type: ORDER,
//     payload: id,
//   };
// }

// export const deleteFavorite = (id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(
//         `https://rick-and-morty-production-f7fc.up.railway.app/rickandmorty/fav/${id}`
//       );
//       console.log(response); // Agregado para verificar la respuesta del backend
//       dispatch({ type: DELETE_FAVORITE, payload: id });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };
