import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filters.module.css';
import {
  filterByTypes,
  filterPokeCreated,
  getTypes,
  orderName,
  restorePokemons,
} from '../../redux/actions/actions.js';

const Filters = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);

  const [showOrder, setShowOrder] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handlerAllPokemons() {
    dispatch(restorePokemons());
    setCurrentPage(1);
  }
  function handlerFilterTypes(e) {
    dispatch(filterByTypes(e.target.value));
    setCurrentPage(1);
  }
  function handlerCreated() {
    dispatch(filterPokeCreated('created'));
    setCurrentPage(1);
  }
  function handlerOrderName(e) {
    dispatch(orderName(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerOption}>
        <p className={styles.options}>FILTER</p>
        {showFilter && (
          <div>
            <button onClick={handlerCreated}>Created</button>
            {allTypes &&
              allTypes.map((type) => (
                <button value={type} onClick={handlerFilterTypes} key={type}>
                  {type}
                </button>
              ))}
          </div>
        )}
      </div>
      <div>
        <p className={styles.options}>ORDER BY NAME</p>
        {showOrder && (
          <div>
            <button value='ascending' onClick={handlerOrderName}>
              Ascending
            </button>
            <button value='descending' onClick={handlerOrderName}>
              Descending
            </button>
          </div>
        )}
      </div>
      <div>
        <p onClick={handlerAllPokemons} className={styles.options}>
          RESET FILTERS
        </p>
      </div>
    </div>
  );
};

export default Filters;
