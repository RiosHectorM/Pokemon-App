import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Card from './Card';

export default function Cards() {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);

  const pokeAwait = async () => {
    let pokeArray = [];
    setIsLoading(true);

    for (let i = 1; i <= 100; i++) {
      const data = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokeArray.push(data.data);
    }
    setPokemon(pokeArray);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className='App'>
        <h1>Cargando...</h1>
      </div>
    );
  }

  return (
    <div>
      <button onClick={pokeAwait}>Obtener Pokemones</button>
      <div className='containerBody'>
        <div className='cardContainer'>
          {pokemon.map((poke) => (
            <Card pokemon={poke} key={poke.name}/>
          ))}
        </div>
      </div>
    </div>
  );
}
