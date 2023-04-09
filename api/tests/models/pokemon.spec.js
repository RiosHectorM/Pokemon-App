const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model Test', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );

  const pokemon = {
    name: 'Charmander',
    image: 'url.charmander',
    hp: 10,
    attack: 10,
    defense: 10,
    speed: 10,
    height: 10,
    weight: 10,
  };

  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('Correct Pokemon Model', () => {
      it('should create a new pokemon with valid values', async () => {
        const newPokemon = await Pokemon.create(pokemon);
        expect(newPokemon.id).to.exist;
        expect(newPokemon.name).to.equal('Charmander');
        expect(newPokemon.image).to.equal('url.charmander');
        expect(newPokemon.hp).to.equal(10);
        expect(newPokemon.attack).to.equal(10);
        expect(newPokemon.defense).to.equal(10);
        expect(newPokemon.speed).to.equal(10);
        expect(newPokemon.height).to.equal(10);
        expect(newPokemon.weight).to.equal(10);
      });
    });
  });
  
  describe('Pokemon Name Validation Test', () => {
    beforeEach(async () => {
      await Pokemon.sync({ force: true });
      await Pokemon.create(pokemon);
    });
    it('should throw a validation error when trying to create a Pokemon with a duplicate name', async () => {
      const duplicatedPokemon = { ...pokemon };
      try {
        await Pokemon.create(duplicatedPokemon);
        throw new Error('The promise should have been rejected');
      } catch (error) {
        console.log(error.message);
        expect(error.message).to.include('llave duplicada');
      }
    });
  });

    const invalidPokemon = {
    name: '',
    image: '',
    hp: '',
    attack: 10,
    defense: '',
    speed: 10,
    height: 10,
    weight: 10,
    };
  
  describe('Invalid Pokemon Model', () => {
    it('should throw a validation error when trying to create a Pokemon with invalid data', async () => {
      try {
        await Pokemon.create(invalidPokemon);
        throw new Error('The promise should have been rejected');
      } catch (error) {
        console.log(error.message);
        expect(error.message).to.include('la sintaxis de entrada no es válida');
      }
    });
  });
});
