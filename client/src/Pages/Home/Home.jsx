import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons } from '../../redux/actions/actions.js';
import NotFound from '../../components/NotFound/NotFound';
import Card from '../../components/Card/Card.jsx';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Filters from '../../components/Filters/Filters.jsx';

const Home = () => {
  const dispatch = useDispatch();
  let [allPokemons, setAllPokemons] = useState([]);
  let allPokes = useSelector((state) => state.pokemons);

  useEffect(() => {
    setAllPokemons(allPokes);
  }, [allPokes, allPokemons]);

  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;
  const lastPokemon = currentPage * pokemonsPerPage;
  const firstPokemon = lastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(firstPokemon, lastPokemon);
  const paginated = (pageNumber) => setCurrentPage(pageNumber);

  /////////////////////////////////////
  const [order, setOrder] = useState('');
  ////////////////////////////////////////////////////////////////

  let [loaderr, setLoader] = useState(
    allPokemons[0]?.hasOwnProperty('id') ? true : false
  );

  useEffect(() => {
    if (!loaderr) {
      dispatch(getAllPokemons());
    }
  }, [loaderr, dispatch]);

  return (
    <div className={styles.containerBody}>
      {currentPokemons.length ? (
        <div className={styles.searchFilters}>
          <SearchBar setCurrentPage={setCurrentPage} />
          <Filters setCurrentPage={setCurrentPage} setOrder={setOrder} />
        </div>
      ) : null}
      <div className={styles.column}>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons.length}
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
