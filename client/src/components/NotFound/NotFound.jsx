import React from 'react'
import imgLost from '../../assets/extras/lost.png'
import styles from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2>Pokemon not found</h2>
      <img src={imgLost} alt="lostPokemon" />
    </div>
  );
}

export default NotFound