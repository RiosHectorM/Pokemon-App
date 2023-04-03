import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filters.module.css';
import imgClose from '../../assets/close.png';
import asending from '../../assets/asending.png';
import desending from '../../assets/desending.png';
import pokebola from '../../assets/pokebola.png';

import {
  filterByTypes,
  filterPokeCreated,
  getTypes,
  orderName,
  restorePokemons,
} from '../../redux/actions/actions.js';
import { IMGTYPES } from '../../constants/types';

const Filters = ({ setCurrentPage, setOrder, order }) => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);

  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handlerAllPokemons() {
    dispatch(restorePokemons());
    setCurrentPage(1);
  }
  function handlerFilterTypes(e) {
    dispatch(filterByTypes(e.target.value));
    dispatch(orderName(order));
    setCurrentPage(1);
    setShowFilters(false);
  }
  function handlerCreated() {
    dispatch(filterPokeCreated('created'));
    setCurrentPage(1);
    setShowFilters(false);
  }
  function handlerOrderName(e) {
    dispatch(orderName(e.target.value));
    setOrder(e.target.value);
    setShowOrder(false);
    setCurrentPage(1);
  }

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
                <div className={styles.containerTypes}>
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
            <img src={pokebola} alt='pokebola' className={styles.pokeImage}/>
            <button onClick={handlerCreated} className={styles.buttonType}>
              Created
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
          <button
            className={styles.buttonOrder}
            value='ascending'
            onClick={(e) => handlerOrderName(e)}
          >
            Ascending
          </button>
          <button
            className={styles.buttonOrder}
            value='descending'
            onClick={(e) => handlerOrderName(e)}
          >
            Descending
          </button>
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
    </div>
  );
};

export default Filters;
