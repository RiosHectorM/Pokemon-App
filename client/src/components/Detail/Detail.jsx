import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

export default function Detail(props) {
  const { detailId } = useParams();
  const [poke, setPoke] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await axios(`https://pokeapi.co/api/v2/pokemon/${detailId}`);
      console.log(data.data);
      setPoke(data.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setTypes(poke.types);
  }, [poke]);

  return (
    <div className={styles.containerMain}>
      <div className={styles.containerSup}>
        <div>Atack</div>
        <div>Stats</div>
      </div>
      <div className={styles.containerInf}>
        <div>Data</div>
        <div>
          {poke && (
            <img src={poke.sprites?.other.home.front_default} alt={poke.name} />
          )}
        </div>
        <div className={styles.nameAndTypes}>
          <div><h1>{poke.name}</h1></div>
          {types && <div className={styles.containerTypes}>
            {types.map((t) => (
              <p>{t.type.name}</p>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
}
