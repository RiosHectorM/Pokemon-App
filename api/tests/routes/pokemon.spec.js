const app = require('../../src/app.js');
const chai = require('chai');

describe('GET /', () => {
  it('should return all pokemons', async () => {
    const res = await chai.request(app).get('/');
    chai.expect(res.status).to.equal(200);
    chai.expect(res.body).to.be.an('array');
  });
});
