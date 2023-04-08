import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotFound from '../../components/NotFound/NotFound';
import Card from '../../components/Card/Card.jsx';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Filters from '../../components/Filters/Filters.jsx';
import { restorePokemons } from '../../redux/actions/actions';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restorePokemons());
    setCurrentPage(1);
  }, [dispatch]);

  let allPokes = useSelector((state) => state.filteredPokemons);

  let [order, setOrder] = useState('');
  let [currentPage, setCurrentPage] = useState(1);
  let [currentPokemons, setCurrentPokemons] = useState([]);

  const pokemonsPerPage = 12;

  const paginated = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const lastPokemon = currentPage * pokemonsPerPage;
    const firstPokemon = lastPokemon - pokemonsPerPage;
    setCurrentPokemons(allPokes.slice(firstPokemon, lastPokemon));
  }, [allPokes, currentPage, order]);

  console.log(currentPokemons);

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
          {currentPokemons[0]?.hasOwnProperty('id') ? (
          currentPokemons.map((pokemon) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
          )) ) : (
          <NotFound />) }
        </div>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokes.length}
          paginated={paginated}
        />
      </div>
    </div>
  );
};

export default Home;
