import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div>
        <Link to='/'>
          <img src={logo} alt='logo' className={styles.logo} />
        </Link>
      </div>
      <NavLink
        to='/pokemons'
        style={{ textDecoration: 'none', color: 'black' }}
        className={({ isActive, isPending }) =>
          isPending ? 'pending' : isActive ? 'active' : ''
        }
      >
        <div className={styles.links}>
          <h3>HOME</h3>
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
          <h3>CREATE POKEMON</h3>
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
          <h3>WHO IS THAT POKEMON</h3>
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
          <h3>CHROMOS</h3>
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
          <h3>LOGOUT</h3>
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
