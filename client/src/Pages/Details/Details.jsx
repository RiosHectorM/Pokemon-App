import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../../redux/actions/actions.js';

const Details = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getPokemonDetails(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.pokemon);

  return (
    <div>
      <div>
        <div></div>
        {pokemon.image ? (
          <img src={pokemon.image} alt='pokemon' loading='lazy' />
        ) : null}
        <h1>{pokemon.name}</h1>
        {pokemon.types && pokemon.types.map((poke) => <h3>{poke.name}</h3>)}
        <h3>hp {pokemon.hp}</h3>
        <h3>attack {pokemon.attack}</h3>
        <h3>defense {pokemon.defense}</h3>
        <h3>speed {pokemon.speed}</h3>
        <h3>height {pokemon.height}</h3>
        <h3>weight {pokemon.weight}</h3>
      </div>
    </div>
  );
};

export default Details;
