import React from 'react';

const Pagination = ({ pokemonsPerPage, allPokemons, paginated }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <div>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div key={number}>
              <button onClick={() => paginated(number)}>{number}</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Pagination;
