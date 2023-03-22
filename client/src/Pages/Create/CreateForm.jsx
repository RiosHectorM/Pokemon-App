import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getTypes, postPokemon } from '../../redux/actions/actions';
import { redirect } from 'react-router-dom';

const Create = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.allTypes);

  const [input, setInput] = useState({
    name: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    image: '',
    types: '',
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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
    redirect('/pokemons');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            required
            type='text'
            placeholder='Name'
            name='name'
            value={input.name}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Health'
            name='hp'
            value={input.hp}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Attack'
            name='attack'
            value={input.attack}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Defense'
            name='defense'
            value={input.defense}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Speed'
            name='speed'
            value={input.speed}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Height'
            name='height'
            value={input.height}
            onChange={handleInput}
          />
        </div>
        <div>
          <input
            type='number'
            placeholder='Weight'
            name='weight'
            value={input.weight}
            onChange={handleInput}
          />
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
            placeholder={'Types'}
            value={input.types}
            onChange={handleInput}
          />
        </div>
        <select onChange={handleSelect}>
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

          {/* {types.map((e) => {
              return (
                <option value={e.name} key={e.id}>
                  {e.name}
                </option>
              );
            })} */}
        </select>

        <button type='submit'>Create!</button>
      </form>
    </div>
  );
};

export default Create;
