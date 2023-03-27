import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IMGTYPES } from '../../constants/types';
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
    image: '',
    types: [],
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSelect = (e) => {
  //   setInput({
  //     ...input,
  //     types: [...input.types, e.target.value],
  //   });
  // };

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postPokemon(input));
    setInput({
      name: '',
      // firstType: '',
      // secondType: '',
      types: '',
      image: '',
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
    });
    alert('POKEMON CREATED');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.title}>
        <h3>CREATE YOUR POKEMON!</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.containerImage}>IMAGEN</div>
        <div className={styles.containerData}>
          <div className={styles.containerForm}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.containerStats}>
                <h5>CHARACTERISTICS</h5>
                <div className={styles.charaterist}>
                  <div>
                    <label htmlFor='name'>NAME:</label>
                    <input
                      required
                      type='text'
                      placeholder='Name'
                      name='name'
                      value={input.name}
                      onChange={handleInput}
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
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      class='rangeStyle'
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
                    <label htmlFor='height' className={styles.labels}>
                      WEIGHT
                    </label>
                    <input
                      type='text'
                      value={input.weight}
                      name='weight'
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      class='rangeStyle'
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
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      class='rangeStyle'
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
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      class='rangeStyle'
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
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      class='rangeStyle'
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
                      onChange={handleInput}
                      className={styles.input}
                    />
                    <input
                      type='range'
                      class='rangeStyle'
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

                {/* <select onChange={handleSelect}>
                  <option value={'111111'} key={'aasd1'}>
                    opcion1
                  </option>
                  <option value={'1111s'} key={'aasd2'}>
                    opcion2
                  </option>
                  <option value={'23'} key={'aasd3'}>
                    opcion3
                  </option>
                  <option value={'453'} key={'asd4'}>
                    opcion4
                  </option>
                </select> */}
              </div>
              <div className={styles.containerTypes}>
                TYPES
                <div className={styles.checkTypes}>
                  {allTypes &&
                    allTypes.map((type) => (
                      <div>
                        <div className={styles.checkOptions}>
                          <input
                            class='form-check-input'
                            type='checkbox'
                            name='types'
                            value={type}
                          />
                          <img
                            src={IMGTYPES[type]}
                            alt={type}
                            className={styles.imgTypes}
                          />
                          <label class='' for={type}>
                            {type}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
                <div>
                  <input
                    type='text'
                    name='image'
                    placeholder={'pick an image'}
                    value={input.image}
                    onChange={handleInput}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    name='types'
                    placeholder={'types'}
                    value={input.types}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <button type='submit'>Create!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
