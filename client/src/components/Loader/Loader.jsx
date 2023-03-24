import React from 'react';
import imgLoader from '../../assets/loader.gif';

const Loader = () => {
  return (
    <div>
      <img src={imgLoader} alt='Loading' />
    </div>
  );
};

export default Loader;
