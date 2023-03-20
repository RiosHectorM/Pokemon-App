import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions/actions';
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
      <div>FILTERS</div>
    </div>
  );
};

export default SearchBar;
