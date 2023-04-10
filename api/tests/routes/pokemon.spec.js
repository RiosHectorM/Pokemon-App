const app = require('../../src/app.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET Pikachu Data', () => {
  it('should return all pokemons', (done) => {
    chai
      .request(app)
      .get('/pokemons/25')
      .end((err, res) => {
        chai.expect(res.status).to.equal(200);
        chai.expect(res.body).to.be.an('object');
        chai.expect(res.body.name).to.equal('pikachu');
        done();
      });
  }, 5000); // <-- 5000ms de tiempo máximo de espera
});

const expect = chai.expect;

describe('POST /pokemons', () => {
  it('should create a new custom pokemon', async () => {
    const newPoke = {
      name: 'MyPokemon',
      hp: 100,
      attack: 50,
      defense: 30,
      speed: 70,
      height: 15,
      weight: 80,
      image: 'url.image',
      types: ['fire', 'flying'],
    };

    const res = await chai.request(app).post('/pokemons').send(newPoke);

    expect(res.status).to.equal(201);
    expect(res.body).to.be.an('object');
    expect(res.body.name).to.equal('mypokemon');
  });

  it('should return a 400 error if pokemon name already exists', async () => {
    const newPoke = {
      name: 'MyPokemon',
      hp: 100,
      attack: 50,
      defense: 30,
      speed: 70,
      height: 15,
      weight: 80,
      image: 'url.image',
      types: ['fire', 'flying'],
    };

    const res = await chai.request(app).post('/pokemons').send(newPoke);

    expect(res.status).to.equal(400);
  });
});