import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions/actions';
import imgClose from '../../assets/close.png';
import imgSearch from '../../assets/search.png';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name));
    setName('');
    setShowSearch(false);
  }

  const showSearchDiv = () => {
    setShowSearch(true);
  };

  const closeSearchDiv = () => {
    setShowSearch(false);
  };

  return (
    <div className={styles.container}>
      <div onClick={showSearchDiv}>
        <p className={styles.options}>SEARCH BY NAME</p>{' '}
      </div>
      {showSearch && (
        <div className={styles.containerSearch}>
          <form onSubmit={handlerSubmit}>
            <input
              type='text'
              value={name}
              placeholder='Pokemon...'
              className={styles.search}
              onChange={handleInputChange}
            />
            <button type='submit' className={styles.buttonSearch}>
              SEARCH
            </button>
          </form>
          <img src={imgSearch} alt='search' className={styles.imgSearch} />
          <img
            src={imgClose}
            alt='close'
            className={styles.imgClose}
            onClick={closeSearchDiv}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;

{
  /* <button onClick={handlerReset}>RESET FILTERS</button>; */
}
