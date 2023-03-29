import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NEWPOKES } from '../../constants/newPokes';
import { IMGTYPES } from '../../constants/types';
import validations from '../../constants/validations';
import { getTypes, postPokemon } from '../../redux/actions/actions';
import styles from './CreateForm.module.css';

const Create = () => {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.allTypes);

  const [input, setInput] = useState({
    name: '',
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: NEWPOKES[0],
    types: [],
  });

  const [error, setError] = useState({});

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validations({
            ...input,
            [e.target.name] : e.target.value
    }))
    console.log(error)
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
  };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    setInput({
      name: '',
      image: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      // firstType: '',
      // secondType: '',
      types: '',
    });
    alert('POKEMON CREATED');
  };

  let [imgNewPoke, setImgNewPoke] = useState(NEWPOKES[0]);

  const setImage = (poke) => {
    setImgNewPoke(poke);
    setInput({
      ...input,
      image: poke,
    });
  };

  return (
    <div className={styles.mainContainer}>
      {/* <div className={styles.title}>
        <h3>CREATE YOUR POKEMON!</h3>
      </div> */}
      <div className={styles.container}>
        <div className={styles.containerImage}>
          <div className={styles.containerNewImage}>
            <img src={imgNewPoke} alt='poke' className={styles.imgNewPoke} />
          </div>
          <div className={styles.containerMiniatures}>
            {NEWPOKES.map((poke) => (
              <img
                src={poke}
                alt='poke'
                className={styles.miniature}
                onClick={() => setImage(poke)}
                key={poke}
              />
            ))}
          </div>
        </div>
        <div className={styles.containerData}>
          <div className={styles.containerForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.containerStats}>
                <h5>CHARACTERISTICS</h5>
                <div className={styles.charaterist}>
                  <div>
                    <label htmlFor='name'>NAME:</label>
                    <input
                      type='text'
                      autoFocus
                      placeholder='Name'
                      name='name'
                      id='name'
                      value={input.name}
                      onChange={handleInput}
                      className={styles.nameInput}
                    />
                  </div>
                  <div className={styles.stat}>
                    <label htmlFor='height' className={styles.labels}>
                      HEIGHT
                    </label>
                    <input
                      type='text'
                      value={input.height}
                      name='height'
                      id='height'
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      name='height'
                      value={input.height}
                      onChange={handleInput}
                      min='0'
                      max='50'
                      step='1'
                      className={styles.range}
                    ></input>
                  </div>
                  <div className={styles.stat}>
                    <label htmlFor='weight' className={styles.labels}>
                      WEIGHT
                    </label>
                    <input
                      type='text'
                      value={input.weight}
                      name='weight'
                      id='weight'
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      name='weight'
                      value={input.weight}
                      onChange={handleInput}
                      min='0'
                      max='1000'
                      step='1'
                      className={styles.range}
                    ></input>
                  </div>
                </div>
                <h5>STATS</h5>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <label htmlFor='hp' className={styles.labels}>
                      HEALT
                    </label>
                    <input
                      type='text'
                      value={input.hp}
                      name='hp'
                      id='hp'
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      name='hp'
                      value={input.hp}
                      onChange={handleInput}
                      min='0'
                      max='150'
                      step='1'
                      className={styles.range}
                    ></input>
                  </div>
                  <div className={styles.stat}>
                    <label htmlFor='attack' className={styles.labels}>
                      ATTACK
                    </label>
                    <input
                      type='text'
                      value={input.attack}
                      name='attack'
                      id='attack'
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      name='attack'
                      value={input.attack}
                      onChange={handleInput}
                      min='0'
                      max='150'
                      step='1'
                      className={styles.range}
                    ></input>
                  </div>
                  <div className={styles.stat}>
                    <label htmlFor='defense' className={styles.labels}>
                      DEFENSE
                    </label>
                    <input
                      type='text'
                      value={input.defense}
                      name='defense'
                      id='defense'
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      name='defense'
                      value={input.defense}
                      onChange={handleInput}
                      min='0'
                      max='150'
                      step='1'
                      className={styles.range}
                    ></input>
                  </div>
                  <div className={styles.stat}>
                    <label htmlFor='speed' className={styles.labels}>
                      SPEED
                    </label>
                    <input
                      type='text'
                      value={input.speed}
                      name='speed'
                      id='speed'
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      name='speed'
                      value={input.speed}
                      onChange={handleInput}
                      min='0'
                      max='150'
                      step='1'
                      className={styles.range}
                    ></input>
                  </div>
                </div>
              </div>
              <div className={styles.containerTypes}>
                <div className={styles.checkTypes}>
                  {allTypes &&
                    allTypes.map((type) => (
                      <div className={styles.checkOptions} key={type}>
                        <input
                          className={styles.ckeck}
                          type='checkbox'
                          name='types'
                          id={type}
                          value={type}
                          onChange={handleSelect}
                        />
                        <label className={styles.typesLabels} htmlFor={type}>
                        <img
                          src={IMGTYPES[type]}
                          alt={type}
                          className={styles.imgTypes}
                          htmlFor={type}
                        />
                          {type}
                        </label>
                      </div>
                    ))}
                </div>
                <div style={{ display: 'none' }}>
                  <input
                    type='text'
                    name='image'
                    id='image'
                    placeholder={'pick an image'}
                    value={input.image}
                    onChange={handleInput}
                  />
                </div>
                <div style={{ display: 'none' }}>
                  <input
                    type='text'
                    name='types'
                    placeholder={'types'}
                    value={input.types}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className={styles.containerButtonCreate}>
                {error && <button type='submit' className={styles.createButton}>
                  CREATE !!!
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
