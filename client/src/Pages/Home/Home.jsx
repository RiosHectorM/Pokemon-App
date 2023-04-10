import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NotFound from '../../components/NotFound/NotFound';
import Card from '../../components/Card/Card.jsx';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Filters from '../../components/Filters/Filters.jsx';

const Home = () => {
  let allPokes = useSelector((state) => state.filteredPokemons);

  let [toggle,setToggle] = useState(false)

  let [order, setOrder] = useState('');
  let [currentPage, setCurrentPage] = useState(0);
  let [currentPokemons, setCurrentPokemons] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const pokemonsPerPage = 12;

  useEffect(() => {
    setTotalPage(Math.ceil(allPokes.length / pokemonsPerPage, 1));
    setCurrentPokemons(
      [...allPokes].splice(currentPage * pokemonsPerPage, pokemonsPerPage)
    );
  }, [allPokes, currentPage, order]);

  return (
    <div className={styles.containerBody}>
      <div className={styles.searchFilters}>
        <SearchBar />
        <Filters
          setCurrentPage={setCurrentPage}
          setOrder={setOrder}
          order={order}
          toggle={toggle}
          setToggle={setToggle}
        />
      </div>
      <div className={styles.column}>
        <Pagination
          pokemonsPerPage={pokemonsPerPage}
          allPokes={allPokes}
          currentPokemons={currentPokemons}
          setCurrentPokemons={setCurrentPokemons}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPage}
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
                toggle={toggle}
              />
            ))
          ) : (
            <NotFound />
          )}
        </div>
      </div>
      <Pagination
        pokemonsPerPage={pokemonsPerPage}
        allPokes={allPokes}
        currentPokemons={currentPokemons}
        setCurrentPokemons={setCurrentPokemons}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </div>
  );
};

export default Home;
