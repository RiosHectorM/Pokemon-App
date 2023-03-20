import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <Link to={'/pokemons'} > START </Link>
    </div>
  );
};

export default Landing;
