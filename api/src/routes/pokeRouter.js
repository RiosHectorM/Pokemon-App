const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const { getPokeApi } = require('../controlers/getApiData.js');
const { getPoke } = require('../controlers/getPoke.js');
const { getDBData } = require('../controlers/getDBData.js');

const router = Router();

const searchBDbyId = async (id) => {
  let pokeName = await Pokemon.findOne({
    where: { id: id },
    include: {
      model: Type,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });
  if (pokeName) return pokeName;
  return [];
};

const searchBD = async (name) => {
  let pokeName = await Pokemon.findOne({
    where: { name: name },
    include: {
      model: Type,
      attributes: ['name'],
      through: { attributes: [] },
    },
  });

  if (pokeName) return pokeName;
  return null;
};

router.get('/', async (req, res) => {
  let { name } = req.query;
  if (name) {
    try {
      name = name.toLowerCase();
      let pokeForParams = await getPoke(name);
      if (pokeForParams.length === 0) {
        pokeForParams = await searchBD(name);
      }
      res.status(200).send([pokeForParams]);
    } catch (error) {
      res.status(400).send([]);
    }
  } else {
    try {
      let allPokeApi = await getPokeApi();
      let allPokeBD = await getDBData();
      let allPoke = allPokeBD.concat(allPokeApi);
      res.status(200).send(allPoke);
    } catch (error) {
      res.status(400).redirect('/');
    }
  }
});

router.get('/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params;
  let RegExpNumber = /^([0-9])*$/;
  let RegExpString = /^[a-zA-ZáéíóúüñÑ]*$/;
  let pokeForId = [];

  try {
    console.log(RegExpNumber.test(idPokemon));
    console.log(RegExpString.test(idPokemon));
    if (RegExpNumber.test(idPokemon) || RegExpString.test(idPokemon)) {
      pokeForId = await getPoke(idPokemon);
    } else {
      pokeForId = await searchBDbyId(idPokemon);
    }
    res.status(200).json(pokeForId);
  } catch (error) {
    console.log('Api Error, retry in progress ');
    res.status(400).redirect(`/pokemons/${idPokemon}`);
  }
});

router.post('/', async (req, res) => {
  let { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;

  name = name.toLowerCase();
  //Valida que no exista un pokemon personalizado con el mismo nombre
  const exists = await Pokemon.findOne({ where: { name: name } });
  if (exists) return res.status(400).send(null);

  //superadas las validaciones crea el nuevo pokemon personalizado
  try {
    const newPoke = await Pokemon.create({
      name: name,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      image: image,
    });

    types.map(async (t) => {
      typePoke = await Type.findAll({ where: { name: t } });
      newPoke.addType(typePoke, { timestamps: false });
    });

    res.status(201).send(newPoke);
  } catch (err) {
    console.log(err);
    res.status(400).send(null);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Pokemon.destroy({
      where: {
        id: id,
      },
      force: true,
    });
  } catch (error) {
    console.log('error');
    res.status(400).send({ error: 'Delete Fail' });
  }
});

module.exports = router;
