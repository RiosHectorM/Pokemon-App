import React from 'react';
import styles from './PokeCraft.module.css';
import creating from '../../assets/extras/creating.gif';

const PokeCraft = () => {
  return (
    <div className={styles.crafting}>
      <div>
        <h2>CRAFTING YOUR POKEMON</h2>
      </div>
      <div>
        <img src={creating} alt='Creating' className={styles.imgCrafting} />
      </div>
      <div>
        <h3>Wait a few seconds please...</h3>
      </div>
    </div>
  );
};

export default PokeCraft;
