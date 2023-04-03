import React from 'react';
import styles from './ErrorCraft.module.css';
import fail from '../../assets/extras/fail.gif';
import { useNavigate } from 'react-router-dom';

const ErrorCraft = ({ setErrorCraft }) => {
  const handleRetry = () => {
    setErrorCraft(false);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.crafting}>
      <div>
        <h2>AN ERROR OCCURRED IN THE CREATION OF YOUR POKEMON</h2>
      </div>
      <div className={styles.containerImgfail}>
        <img src={fail} alt='Creating' className={styles.imgFail} />
      </div>
      <div className={styles.containerButtons}>
        <button onClick={handleRetry} className={styles.buttons}>
          RETRY
        </button>
        <button
          onClick={() => navigate('/pokemons')}
          className={styles.buttons}
        >
          GO TO START
        </button>
      </div>
    </div>
  );
};

export default ErrorCraft;
