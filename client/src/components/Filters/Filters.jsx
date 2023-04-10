import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filters.module.css';
import imgClose from '../../assets/close.png';
import asending from '../../assets/asending.png';
import desending from '../../assets/desending.png';
import pokebola from '../../assets/pokebola.png';
import { IMGTYPES } from '../../constants/types';
import {
  filterByTypes,
  filterPokeCreated,
  getTypes,
  orderName,
  restorePokemons,
} from '../../redux/actions/actions.js';

const Filters = ({ setCurrentPage, setOrder, order, toggle, setToggle }) => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);

  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const [sortOrder, setSortOrder] = useState('name');

  const handlerOptionChange = (e) => {
    setSortOrder(e.target.value);
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handlerAllPokemons = () => {
    dispatch(restorePokemons());
    //await dispatch(orderName(order));
    setCurrentPage(0);
  };
  const handlerFilterTypes = (e) => {
    dispatch(filterByTypes(e.target.value));
    dispatch(orderName(order, sortOrder));
    setCurrentPage(0);
    setShowFilters(false);
  };
  const handlerCreated = () => {
    dispatch(filterPokeCreated('created'));
    dispatch(orderName(order));
    setCurrentPage(0);
    setShowFilters(false);
  };
  const handlerOrderName = (e) => {
    dispatch(orderName(e.target.value, sortOrder));
    setOrder(e.target.value);
    setShowOrder(false);
    setCurrentPage(0);
  };

  const showFiltersDiv = () => {
    setShowFilters(true);
  };
  const closeFiltersDiv = () => {
    setShowFilters(false);
  };
  const showOrderDiv = () => {
    setShowOrder(true);
  };
  const closeOrderDiv = () => {
    setShowOrder(false);
  };

  const handlerAnimated = () => {
    setToggle(!toggle);
  };

  return (
    <div className={styles.container}>
      <div onClick={showFiltersDiv}>
        <p className={styles.options}>FILTER BY TYPE</p>{' '}
      </div>
      {showFilters && (
        <div className={styles.containerFloatTypes}>
          <div className={styles.containerTypesMain}>
            {allTypes &&
              allTypes.map((type) => (
                <div className={styles.containerTypes} key={type}>
                  <img
                    src={IMGTYPES[type]}
                    alt={type}
                    className={styles.imgTypes}
                  />
                  <button
                    value={type}
                    onClick={handlerFilterTypes}
                    key={type}
                    className={styles.buttonType}
                  >
                    {type}
                  </button>
                </div>
              ))}
          </div>
          <div className={styles.closeAndCreated}>
            <div className={styles.closeContainer}>
              <img
                src={imgClose}
                alt='close'
                className={styles.imgClose}
                onClick={closeFiltersDiv}
              />
            </div>
            <img src={pokebola} alt='pokebola' className={styles.pokeImage} />
            <button onClick={handlerCreated} className={styles.buttonType}>
              CUSTOM POKEMONS
            </button>
          </div>
        </div>
      )}
      <div onClick={showOrderDiv}>
        <p className={styles.options}>ORDER BY NAME</p>{' '}
      </div>
      {showOrder && (
        <div className={styles.containerFloat}>
          <img src={asending} alt='ascending' className={styles.imgOrder1} />
          <div className={styles.columnOrder}>
            <h3>CHOOSE SORT ORDER</h3>
            <div className={styles.sortOrder}>
              <div>
                <div className={styles.orderBy}>
                  <input
                    type='radio'
                    name='orderSort'
                    id='name'
                    value='name'
                    checked={sortOrder === 'name'}
                    onChange={handlerOptionChange}
                  />
                  <label htmlFor='name' className={styles.labelsOrder}>
                    NAME
                  </label>
                </div>
                <div className={styles.orderBy}>
                  <input
                    type='radio'
                    name='orderSort'
                    id='height'
                    value='height'
                    checked={sortOrder === 'height'}
                    onChange={handlerOptionChange}
                  />
                  <label htmlFor='height' className={styles.labelsOrder}>
                    HEIGHT
                  </label>
                </div>
                <div className={styles.orderBy}>
                  <input
                    type='radio'
                    name='orderSort'
                    id='weight'
                    value='weight'
                    checked={sortOrder === 'weight'}
                    onChange={handlerOptionChange}
                  />
                  <label htmlFor='weight' className={styles.labelsOrder}>
                    WEIGHT
                  </label>
                </div>
              </div>
              <div>
                <div className={styles.orderBy}>
                  <input
                    type='radio'
                    name='orderSort'
                    id='attack'
                    value='attack'
                    checked={sortOrder === 'attack'}
                    onChange={handlerOptionChange}
                  />
                  <label htmlFor='attack' className={styles.labelsOrder}>
                    ATTACK
                  </label>
                </div>
                <div className={styles.orderBy}>
                  <input
                    type='radio'
                    name='orderSort'
                    id='defense'
                    value='defense'
                    checked={sortOrder === 'defense'}
                    onChange={handlerOptionChange}
                  />
                  <label htmlFor='defense' className={styles.labelsOrder}>
                    DEFENSE
                  </label>
                </div>
                <div className={styles.orderBy}>
                  <input
                    type='radio'
                    name='orderSort'
                    id='speed'
                    value='speed'
                    checked={sortOrder === 'speed'}
                    onChange={handlerOptionChange}
                  />
                  <label htmlFor='speed' className={styles.labelsOrder}>
                    SPEED
                  </label>
                </div>
                <div className={styles.orderBy}>
                  <input
                    type='radio'
                    name='orderSort'
                    id='hp'
                    value='hp'
                    checked={sortOrder === 'hp'}
                    onChange={handlerOptionChange}
                  />
                  <label htmlFor='hp' className={styles.labelsOrder}>
                    HEALT
                  </label>
                </div>
              </div>
            </div>
            <div className={styles.buttonsAscDesc}>
              <button
                className={styles.buttonOrder}
                value='ascending'
                onClick={handlerOrderName}
              >
                Ascending
              </button>
              <button
                className={styles.buttonOrder}
                value='descending'
                onClick={handlerOrderName}
              >
                Descending
              </button>
            </div>
          </div>
          <img src={desending} alt='desending' className={styles.imgOrder2} />
          <img
            src={imgClose}
            alt='close'
            className={styles.imgClose}
            onClick={closeOrderDiv}
          />
        </div>
      )}
      <button
        type='reset'
        onClick={handlerAllPokemons}
        className={styles.options}
      >
        RESET FILTERS
      </button>
      <button
        type='button'
        onClick={handlerAnimated}
        className={styles.options}
      >
        {toggle ? 'STATIC POKEMONS' : 'ANIMATED POKEMONS'}
      </button>
    </div>
  );
};

export default Filters;
