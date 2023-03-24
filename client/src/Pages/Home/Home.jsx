import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons } from '../../redux/actions/actions.js';
import NotFound from '../../components/NotFound/NotFound';
import Card from '../../components/Card/Card.jsx';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import Loader from '../../components/Loader/Loader.jsx';

const Home = () => {
  const dispatch = useDispatch();
  let [allPokemons, setAllPokemons] = useState([]);
  let allPokes = useSelector((state) => state.pokemons);

  useEffect(() => {
    setAllPokemons(allPokes);
  }, [allPokes, allPokemons]);

  let [loaderr, setLoader] = useState(
    allPokemons[0]?.hasOwnProperty('id') ? true : false
  );

  useEffect(() => {
    if (!loaderr) {
      dispatch(getAllPokemons());
    }
  }, [loaderr, dispatch]);

  console.log(allPokemons);

  console.log(allPokemons.length);
  console.log('loaderr');
  console.log(loaderr);
  return (
    <div className={styles.containerBody}>
      <SearchBar />
      <div className={styles.cardContainer}>
        {allPokemons.length ? (
          allPokemons[0]?.hasOwnProperty('id') ? (
            allPokemons.map((pokemon) => (
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
  );
};

export default Home;
