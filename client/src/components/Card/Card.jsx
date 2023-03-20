import React from 'react';
import { TYPES } from '../../constants/types.js';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ id, name, image, types }) {
  return (
      <div
        className={styles.card}
         style={{ background: TYPES[types[0]?.name] }}
      >
        <div className={styles.info}>
          <h3>{name}</h3>
          <h3>
            {types[0]?.name}
            {types[1]?.name}
          </h3>
        </div>
      
        <Link to={`/pokemons/${id}`}>
          {image ? (
            <img
              src={image}
              alt='pokemon'
              className={styles.imgPoke}
              loading='lazy'
            />
          ) : null}
        </Link>
      </div>
  );
}
