import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../../redux/actions/actions.js';
import styles from './Details.module.css';
import { TYPES, IMGTYPES, STATS } from '../../constants/types.js';
import maleImg from '../../assets/male.png';
import femaleImg from '../../assets/female.png';

const Details = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(getPokemonDetails(id));
  }, [dispatch, id]);

  const pokemon = useSelector((state) => state.pokemon);
  console.log(pokemon);
  let [fondo, setFondo] = useState({ background: 'black' });

  useEffect(() => {
    if (pokemon.types) {
      console.log(TYPES[pokemon?.types[0]?.name]);
      setFondo({ background: TYPES[pokemon.types[0].name] });
    }
  }, [pokemon.types]);

  return (
    <div className={styles.container} style={fondo}>
      <div className={styles.containerSup}>
        {/* Contenedor sin definir */}
        <div>DATA A DEFINIR</div>
        {/* Contenedor de STATS */}
        <div className={styles.progress}>
          <div className={styles.stats}>
            <div className={styles.statsName}>
              <h3>HEALT</h3>
            </div>
            <div
              className={styles.progressValue}
              style={{
                width: `${(pokemon.hp * 100) / 150}%`,
                background: STATS.hp,
              }}
            ></div>
            <h3>{pokemon.hp}</h3>
          </div>
          <div className={styles.stats}>
            <div className={styles.statsName}>
              <h3>ATTACK</h3>
            </div>
            <div
              className={styles.progressValue}
              style={{
                width: `${(pokemon.attack * 100) / 150}%`,
                background: STATS.attack,
              }}
            ></div>
            <h3>{pokemon.attack}</h3>
          </div>
          <div className={styles.stats}>
            <div className={styles.statsName}>
              <h3>DEFENSE</h3>
            </div>
            <div
              className={styles.progressValue}
              style={{
                width: `${(pokemon.defense * 100) / 150}%`,
                background: STATS.defense,
              }}
            ></div>
            <h3>{pokemon.defense}</h3>
          </div>
          <div className={styles.stats}>
            <div className={styles.statsName}>
              <h3>SPEED</h3>
            </div>
            <div
              className={styles.progressValue}
              style={{
                width: `${(pokemon.speed * 100) / 150}%`,
                background: STATS.speed,
              }}
            ></div>
            <h3>{pokemon.speed}</h3>
          </div>
        </div>
      </div>
      <div className={styles.containerInf}>
        {/* Container de INFO */}
        <div className={styles.containerDetails}>
          <h3>HEIGHT: {pokemon.height}</h3>
          <h3>WEIGHT: {pokemon.weight}</h3>
          <h3>GENDER: </h3>
          <img src={maleImg} alt='male' className={styles.genderImg} />
          <img src={femaleImg} alt='male' className={styles.genderImg} />
        </div>
        {/* Container IMAGEN */}
        <div>
          {pokemon.image ? (
            <img
              src={pokemon.image}
              alt='pokemon'
              loading='lazy'
              className={styles.imgPoke}
            />
          ) : null}
        </div>
        {/* Container TYPES */}
        <div
          className={styles.containerNameTypes}
          style={{ transform: 'translate(0)' }}
        >
          <h1>{pokemon.name}</h1>
          <div className={styles.containerT}>
            {pokemon.types &&
              pokemon.types.map((poke) => (
                <div className={styles.containerTypes}>
                  <img
                    src={IMGTYPES[poke.name]}
                    alt={poke.name}
                    className={styles.typesImg}
                  />
                  <h3>{poke.name}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
