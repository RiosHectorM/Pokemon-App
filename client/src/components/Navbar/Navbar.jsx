import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { useDispatch } from 'react-redux';
import { restorePokemons } from '../../redux/actions/actions';


const Navbar = () => {
  
  const dispatch = useDispatch();
  
  const handleReset = () => {
        dispatch(restorePokemons());
  }

  return (
    <nav className={styles.container}>
      <div>
        <Link to='/'>
          <img src={logo} alt='logo' className={styles.logo} />
        </Link>
      </div>
      <Link
        to='/pokemons'
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div className={styles.links} onClick={handleReset}>
          <p>HOME</p>
        </div>
      </Link>
      <NavLink
        to='/create'
        style={{ textDecoration: 'none', color: 'black' }}
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''
        }
      >
        <div className={styles.links}>
          <p>CREATE POKEMON</p>
        </div>
      </NavLink>
      <NavLink
        to='/create'
        style={{ textDecoration: 'none', color: 'black' }}
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''
        }
      >
        <div className={styles.links}>
          <p>WHO IS THAT POKEMON</p>
        </div>
      </NavLink>
      <NavLink
        to='/create'
        style={{ textDecoration: 'none', color: 'black' }}
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''
        }
      >
        <div className={styles.links}>
          <p>CHROMOS</p>
        </div>
      </NavLink>
      <NavLink
        to='/create'
        style={{ textDecoration: 'none', color: 'black' }}
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''
        }
      >
        <div className={styles.links}>
          <p>LOGOUT</p>
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
