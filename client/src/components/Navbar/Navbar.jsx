import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { useDispatch } from 'react-redux';
import { restorePokemons } from '../../redux/actions/actions';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(restorePokemons());
  };

  return (
    <nav className={styles.container}>
      <div>
        <a href='/' style={{ textDecoration: 'none', color: 'black' }}>
          <img src={logo} alt='logo' className={styles.logo} />
        </a>
      </div>
      <Link to='/pokemons' style={{ textDecoration: 'none', color: 'black' }}>
        <div className={styles.links} onClick={handleReset}>
          <p>HOME</p>
        </div>
      </Link>
      <Link to='/create' style={{ textDecoration: 'none', color: 'black' }}>
        <div className={styles.links}>
          <p>CREATE POKEMON</p>
        </div>
      </Link>
      <Link to='/play' style={{ textDecoration: 'none', color: 'black' }}>
        <div className={styles.links}>
          <p>WHO IS THAT POKEMON</p>
        </div>
      </Link>

    </nav>
  );
};

export default Navbar;
