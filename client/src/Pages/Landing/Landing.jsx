import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../../redux/actions/actions';
import pokeVideo from '../../assets/video/videoPoke.mp4';
import styles from './Landing.module.css';
import load from '../../assets/loader.gif'

const Landing = () => {
  let [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let cargando = async () => {
      setLoading(true);
      await dispatch(getAllPokemons());
      setLoading(false);
    };
    cargando();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video
          src={pokeVideo}
          autoPlay
          muted
          loop
          className={styles.video}
        ></video>
        <h1 className={styles.tittle}>POKEMON</h1>
      </div>
      {loading ? (
        <div className={styles.imgLoader}>
          <img src={load} alt='loading' />
          <h2>LOADING...</h2>
        </div>
      ) : (
        <div className={styles.start}>
          <Link
            to={'/pokemons'}
            style={{
              textDecoration: 'none',
              color: '#fff',
              letterSpacing: '10px',
            }}
          >
            {' '}
            START{' '}
          </Link>
        </div>
      )}
      <h3 className={styles.subtittle}>
        by Hector Martin Rios - Henry Bootcamp
      </h3>
    </div>
  );
};

export default Landing;
