import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons } from '../../redux/actions/actions.js';
import NotFound from '../../components/NotFound/NotFound';
import Card from '../../components/Card/Card.jsx';
import styles from './Home.module.css';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';

const Home = () => {
  let [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  useEffect(() => {
    setLoader(true);
    dispatch(getAllPokemons());
    setLoader(false);
  }, [dispatch]);
  console.log(allPokemons);

  console.log(allPokemons[0]?.hasOwnProperty('id'));
  return (
    <div className={styles.containerBody}>
      <SearchBar />
      <div className={styles.cardContainer}>
        {allPokemons[0]?.hasOwnProperty('id') ? (
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
        )}
      </div>
    </div>
  );
};

export default Home;
