import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPokemons, searchByName } from '../../redux/actions/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name));
    setName('');
  }
const handlerReset = () => dispatch(getAllPokemons())

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          placeholder='Pokemon Name...'
          onChange={handleInputChange}
        />
        <button type='submit'>SEARCH</button>
      </form>
      <div><button onClick={handlerReset}>RESET FILTERS</button></div>
    </div>
  );
};

export default SearchBar;
