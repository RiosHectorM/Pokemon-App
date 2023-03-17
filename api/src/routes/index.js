const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokeRouter = require('./pokeRouter.js');
const typeRouter = require('./typeRouter.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemon', pokeRouter);
router.use('/types', typeRouter);

module.exports = router;
