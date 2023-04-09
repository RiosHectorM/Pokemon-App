import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({
  pokemonsPerPage,
  allPokes,
  paginated,
  currentPokemons,
  setCurrentPokemons,
  currentPage,
  setCurrentPage,
  totalPage,
}) => {
  const [datosPokes, setDatosPokes] = useState(allPokes);

  const nextHandler = () => {
    const totalElem = datosPokes.length;
    const nextPage = currentPage + 1;
    if (nextPage > totalPage) return;
    const firstIndex = nextPage * pokemonsPerPage;
    if (firstIndex >= totalElem) return;
    setCurrentPokemons([...datosPokes].splice(firstIndex, pokemonsPerPage));
    setCurrentPage(nextPage);
  };

  const prevHandler = () => {
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * pokemonsPerPage;
    setCurrentPokemons([...datosPokes].splice(firstIndex, pokemonsPerPage));
    setCurrentPage(prevPage);
  };

  if (currentPokemons.length === 0) {
    prevHandler();
  }

  if (datosPokes.length <= pokemonsPerPage * (currentPage + 1) + 1) {
    nextHandler();
  }

  return (
    <div className={styles.container}>
      {allPokes.length > pokemonsPerPage && (
        <div className={styles.buttonsContainer}>
          <div className={styles.buttons}>
            <button
              onClick={prevHandler}
              className={styles.buttonNumber}
              style={currentPage + 1 === 1 ? { visibility: 'hidden' } : null}
            >
              PREV
            </button>

            <h3>
              PAGE {currentPage + 1} / {totalPage}
            </h3>
            <button
              onClick={nextHandler}
              className={styles.buttonNumber}
              style={
                currentPage + 1 === totalPage ? { visibility: 'hidden' } : null
              }
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
