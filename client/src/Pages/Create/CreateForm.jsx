import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NEWPOKES } from '../../constants/newPokes';
import { IMGTYPES } from '../../constants/types';
import validations from '../../constants/validations';
import { postPokemon } from '../../redux/actions/actions';
import styles from './CreateForm.module.css';
import { useNavigate } from 'react-router-dom';
import PokeCraft from '../../components/PokeCraft/PokeCraft';
import ErrorCraft from '../../components/ErrorCraft/ErrorCraft';

const Create = () => {
  const navigate = useNavigate();
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

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState({});

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validations({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });

      setError(
        validations({
          ...input,
          types: [...input.types, e.target.value],
        })
      );
    } else if (!e.target.checked) {
      setInput({
        ...input,
        types: input.types.filter((el) => el !== e.target.value),
      });

      setError(
        validations({
          ...input,
          types: input.types.filter((el) => el !== e.target.value),
        })
      );
    }
  };

  let [crafting, setCrafing] = useState(false);
  let [errorCraft, setErrorCraft] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(error).length === 0 && input.name.length) {
      try {
        setCrafing(true);
        await dispatch(postPokemon(input));
        setInput({
          name: '',
          hp: '',
          attack: '',
          defense: '',
          speed: '',
          weight: '',
          height: '',
          types: [],
        });
        setCrafing(false);
        navigate('/pokemons');
      } catch (error) {
        setCrafing(false);
        setError({ name: 'THIS POKEMON ALREADY EXISTS' });
        setErrorCraft(true);
      }
    } else {
      setShowError(true);
      setErrorCraft(true);
    }
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
      {crafting ? <PokeCraft /> : null}
      {errorCraft ? (
        <ErrorCraft setErrorCraft={setErrorCraft} error={error} />
      ) : null}
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
                  <div className={styles.containerErrorData}>
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
                        style={
                          error.name && showError ? { background: 'red' } : null
                        }
                      />
                    </div>
                    <div className={styles.error}>
                      {error.name && showError && <h6>{error.name}</h6>}
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.containerErrorData}>
                      <div>
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
                          style={
                            error.height && showError
                              ? { background: 'red' }
                              : null
                          }
                        />
                        <input
                          type='range'
                          name='height'
                          value={input.height}
                          onChange={handleInput}
                          min='0'
                          max='100'
                          step='1'
                          className={styles.range}
                        ></input>
                      </div>
                      <div className={styles.error}>
                        {error.height && showError && <h6>{error.height}</h6>}
                      </div>
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.containerErrorData}>
                      <div>
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
                          style={
                            error.weight && showError
                              ? { background: 'red' }
                              : null
                          }
                        />
                        <input
                          type='range'
                          name='weight'
                          value={input.weight}
                          onChange={handleInput}
                          min='0'
                          max='5000'
                          step='1'
                          className={styles.range}
                        ></input>
                      </div>
                      <div className={styles.error}>
                        {error.weight && showError && <h6>{error.weight}</h6>}
                      </div>
                    </div>
                  </div>
                </div>
                <h5>STATS</h5>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <div className={styles.containerErrorData}>
                      <div>
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
                          style={
                            error.hp && showError ? { background: 'red' } : null
                          }
                        />
                        <input
                          type='range'
                          name='hp'
                          value={input.hp}
                          onChange={handleInput}
                          min='0'
                          max='250'
                          step='1'
                          className={styles.range}
                        ></input>
                      </div>
                      <div className={styles.error}>
                        {error.hp && showError && <h6>{error.hp}</h6>}
                      </div>
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.containerErrorData}>
                      <div>
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
                          style={
                            error.attack && showError
                              ? { background: 'red' }
                              : null
                          }
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
                      <div className={styles.error}>
                        {error.attack && showError && <h6>{error.attack}</h6>}
                      </div>
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.containerErrorData}>
                      <div>
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
                          style={
                            error.defense && showError
                              ? { background: 'red' }
                              : null
                          }
                        />
                        <input
                          type='range'
                          name='defense'
                          value={input.defense}
                          onChange={handleInput}
                          min='0'
                          max='180'
                          step='1'
                          className={styles.range}
                        ></input>
                      </div>
                      <div className={styles.error}>
                        {error.defense && showError && <h6>{error.defense}</h6>}
                      </div>
                    </div>
                  </div>
                  <div className={styles.stat}>
                    <div>
                      <div>
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
                          style={
                            error.speed && showError
                              ? { background: 'red' }
                              : null
                          }
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
                      <div className={styles.error}>
                        {error.speed && showError && <h6>{error.speed}</h6>}
                      </div>
                    </div>
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
                <div className={styles.error}>
                  {error.types && showError && <h6>{error.types}</h6>}
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
                {error && (
                  <button type='submit' className={styles.createButton}>
                    CREATE !!!
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
