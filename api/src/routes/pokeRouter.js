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
  return null;
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
    let allPokeApi = await getPokeApi();
    let allPokeBD = await getDBData();
    let allPoke = allPokeBD.concat(allPokeApi);
    res.status(200).send(allPoke);
  }
});

router.get('/:idPokemon', async (req, res) => {
  try {
    const { idPokemon } = req.params;
    let pokeForId = await getPoke(idPokemon);
    if (pokeForId.length === 0) {
      pokeForId = await searchBDbyId(idPokemon);
    }

    res.status(200).json(pokeForId);
  } catch (error) {
    res.status(400).send([]);
  }
});

router.post('/', async (req, res) => {
  const { name, hp, attack, defense, speed, height, weight, image, types } =
    req.body;

  //Valida valores * requeridos
  if (!name || !hp || !attack || !defense || !image) {
    return res.status(400).json({
      error: `Missing Values!`,
    });
  }

  //Valida que al menos el pokemon creado tenga un tipo seleccionado
  let arrType = [];
  types.map((e) => arrType.push(e));
  if (!arrType.length) {
    return res.status(400).json({ error: `Select Type of Pokemon` });
  }

  //Valida que no exista un pokemon personalizado con el mismo nombre
  const exists = await Pokemon.findOne({ where: { name: name } });
  if (exists)
    return res.status(400).send({ error: `Pokemon ${name} already exists` });

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
  }
});


module.exports = router;
