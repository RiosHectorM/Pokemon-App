const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Type, Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'pikachu-test',
  hp: 10,
  attack: 10,
  defense: 10,
  image: 'url.image',
  speed: 10,
  height: 10,
  weight: 10,
};

describe('Database connection', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() => Pokemon.sync({ force: true }));

  it('should connect to the pokemon database', () => {
    expect(conn).to.be.an('object');
    expect(conn.config.database).to.equal('pokemon');
  });
});

describe('Create Pokemon Test', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );

  it('should be able to create a pokemon', async () => {
    const createdPokemon = await Pokemon.findOne({
      where: { name: 'pikachu-test' },
    });
    expect(createdPokemon).to.be.an('object');
    expect(createdPokemon.name).to.equal('pikachu-test');
  });
});

const newType = {
  name: 'Henry-Type',
};
describe('Create Type Test', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() => Type.sync({ force: true }).then(() => Type.create(newType)));

  it('should be able to create a new Type', async () => {
    const createdType = await Type.findOne({
      where: { name: 'Henry-Type' },
    });
    expect(createdType).to.be.an('object');
    expect(createdType.name).to.equal('Henry-Type');
  });
});
