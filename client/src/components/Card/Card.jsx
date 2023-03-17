import React from 'react';
import { TYPES } from '../constants/types';
import { Link } from 'react-router-dom';

export default function Card({ pokemon }) {
  return (
    <div
      className='card'
      style={{ background: TYPES[pokemon.types[0].type.name] }}
    >
      <div className='info'>
        <h3>{pokemon.name}</h3>
        <h3>{pokemon.types[0].type.name}</h3>
      </div>
      <Link to={`/detail/${pokemon.id}`}>
        <img
          src={pokemon.sprites.other.home.front_default}
          alt='pokemon'
          className='imgPoke'
          loading='lazy'
        />
      </Link>
    </div>
  );
}
