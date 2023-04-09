import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions/actions';
import imgClose from '../../assets/close.png';
import imgSearch from '../../assets/extras/search.png';
import pikachuSearch from '../../assets/extras/pikachuSearch.gif';

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  let [load, setLoad] = useState(false);
  let [error, setError] = useState(false);

  const RegExpString = /^[a-zA-ZáéíóúüñÑ-]*$/;

  function handleInputChange(e) {
    if (!RegExpString.test(e.target.value)) {
      setError(true);
    } else {
      setError(false);
    }
    setName(e.target.value);
  }

  async function handlerSubmit(e) {
    e.preventDefault();
    setLoad(true);
    await dispatch(searchByName(name));
    setLoad(false);
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
          {!load ? (
            <form onSubmit={handlerSubmit}>
              <input
                type='text'
                value={name}
                placeholder='Pokemon...'
                className={styles.search}
                onChange={handleInputChange}
                style={
                  error ? { background: 'red', border: '2px solid red' } : null
                }
              />
              <button
                type='submit'
                className={styles.buttonSearch}
                disabled={error}
              >
                SEARCH
              </button>
              {error && (
                <div className={styles.errorText}>
                  <h6>You can't use blank spaces,</h6>
                  <h6> numbers or special characters</h6>
                  <h6>to look for pokemon</h6>
                </div>
              )}
            </form>
          ) : (
            <div className={styles.containerSearchGif}>
              <img
                src={pikachuSearch}
                alt='pikachuSearch'
                className={styles.imgSearchGif}
              />
              <h3>SEARCHING...</h3>
            </div>
          )}
          {!load ? (
            <div className={styles.closerDiv}>
              <img src={imgSearch} alt='Search' className={styles.imgSearch} />
              <img
                src={imgClose}
                alt='close'
                className={styles.imgClose}
                onClick={closeSearchDiv}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
