import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  SEARCH_POKEMON,
  POST_POKEMON,
  GET_TYPES,
  FILTER,
  ORDER,
} from '../actions/types.js';

const initialState = {
  pokemons: [],
  pokemon: {},
  allTypes: [],
  filteredPokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload,
      };

    case GET_POKEMON_DETAILS: {
      return {
        ...state,
        pokemon: action.payload,
      };
    }

    case POST_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
      };
    // case FILTER:
    //   const filterCopy = [...state.allCharacters];

    //   const filterGender = filterCopy.filter((char) => char.gender === payload);

    //   return {
    //     ...state,
    //     myFavorites: filterGender,
    //   };
    // case ORDER:
    //   const orderCopy = [...state.allCharacters];

    //   const order = orderCopy.sort((a, b) => {
    //     if (a.id > b.id) {
    //       return payload === 'Ascendente' ? 1 : -1;
    //     }
    //     if (a.id < b.id) {
    //       return payload === 'Ascendente' ? -1 : 1;
    //     } else return 0;
    //   });
    //   return {
    //     ...state,
    //     myFavorites: order,
    //   };

    default:
      return state;
  }
}

export default rootReducer;
