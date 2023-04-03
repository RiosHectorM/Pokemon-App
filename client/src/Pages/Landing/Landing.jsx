import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPokemons } from '../../redux/actions/actions';
import pokeVideo from '../../assets/video/videoPoke.mp4'
import styles from './Landing.module.css'

const Landing = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
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
      <div className={styles.start}>
        <Link to={'/pokemons'} style={{textDecoration:'none', color:'#fff',letterSpacing:'10px'}}> START </Link>
      </div>
      <h3 className={styles.subtittle}>
        by Hector Martin Rios - Henry Bootcamp
      </h3>
    </div>
  );
};

export default Landing;
