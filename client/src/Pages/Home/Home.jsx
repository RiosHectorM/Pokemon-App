import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../../components/NotFound/NotFound';
import Card from '../../components/Card/Card.jsx';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Filters from '../../components/Filters/Filters.jsx';
import { restorePokemons } from '../../redux/actions/actions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restorePokemons());
    setCurrentPage(1);
  },[]);

  let allPokes = [];
  allPokes = useSelector((state) => state.filteredPokemons);

  let [order, setOrder] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  const currentPokemons = allPokes.slice(firstPokemon, lastPokemon);
  const paginated = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.containerBody}>
      {currentPokemons.length ? (
        <div className={styles.searchFilters}>
          <SearchBar />
          <Filters
            setCurrentPage={setCurrentPage}
            setOrder={setOrder}
            order={order}
          />
        </div>
      ) : null}
      <div className={styles.column}>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokes.length}
          paginated={paginated}
        />
        <div className={styles.cardContainer}>
          {currentPokemons.length ? (
            currentPokemons[0]?.hasOwnProperty('id') ? (
              currentPokemons.map((pokemon) => (
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              ))
            ) : (
              <NotFound />
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
