import React from 'react';
import imgLoader from '../../assets/loader.gif';
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.container}>
      <img src={imgLoader} alt='Loading' className={styles.imgLoader} />
    </div>
  );
};

export default Loader;
