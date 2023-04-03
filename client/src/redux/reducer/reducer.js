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
      console.log(action.payload);

      console.log(state.filteredPokemons);
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        filteredPokemons: [...state.filteredPokemons, action.payload],
      };

    case SEARCH_POKEMON:
      return {
        ...state,
        filteredPokemons: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        allTypes: action.payload,
      };

    case FILTER_TYPES:
      const allPokemons = state.pokemons;
      const filterTypes = allPokemons.filter(
        (poke) =>
          poke.types[0].name === action.payload ||
          poke.types[1]?.name === action.payload
      );
      return {
        ...state,
        filteredPokemons: filterTypes,
      };

    case FILTER_CREATES:
      const filterCreated = state.pokemons.filter((p) => p.created);
      return {
        ...state,
        filteredPokemons: filterCreated,
      };

    case RESTORE_POKEMONS:
      return {
        ...state,
        filteredPokemons: state.pokemons,
      };

    case ORDER_NAME:
      let sortPoke = [];
      let toOrder = state.filteredPokemons;
      if (action.payload === 'ascending') {
        sortPoke = toOrder.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        });
      } else {
        sortPoke = toOrder.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
          return 0;
        });
      }
      return {
        ...state,
        filteredPokemons: sortPoke,
      };

    default:
      return state;
  }
}

export default rootReducer;
