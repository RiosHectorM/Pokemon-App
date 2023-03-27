import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAILS,
  SEARCH_POKEMON,
  POST_POKEMON,
  RESTORE_POKEMONS,
  GET_TYPES,
  FILTER_TYPES,
  FILTER_CREATES,
  ORDER_NAME,
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

    case GET_POKEMON_DETAILS:
      return {
        ...state,
        pokemon: action.payload,
      };

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

    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    case FILTER_TYPES:
      const allPokemons = state.filteredPokemons;
      const filterTypes = allPokemons.filter(
        (poke) =>
          poke.types[0].name === action.payload ||
          poke.types[1]?.name === action.payload
      );
      return {
        ...state,
        pokemons: filterTypes,
      };

    case FILTER_CREATES:
      const filterCreated = state.filteredPokemons.filter((p) => p.created);
      return {
        ...state,
        pokemons: filterCreated,
      };

    case RESTORE_POKEMONS:
      return {
        ...state,
        pokemons: state.filteredPokemons,
      };

    case ORDER_NAME:
      let sortPoke = [];
      if (action.payload === 'ascending') {
        sortPoke = state.pokemons.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
      } else {
        sortPoke = state.pokemons.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      console.log(sortPoke);
      return {
        ...state,
        pokemons: sortPoke,
      };

    default:
      return state;
  }
}

export default rootReducer;
