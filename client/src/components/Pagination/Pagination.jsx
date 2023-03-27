import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ pokemonsPerPage, allPokemons, paginated }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerNumbers}>
        {pageNumbers.length > 1 &&
          pageNumbers.map((number) => (
            <div key={number} className={styles.numbers}>
              <button
                onClick={() => paginated(number)}
                className={styles.buttonNumber}
              >
                {number}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pagination;
