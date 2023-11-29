const Router = require('koa-router');
const jwtMiddleware = require('koa-jwt')
const dotenv = require('dotenv');

const users_p = require('./routes/fase_produccion/users');
const casillas_p = require('./routes/fase_produccion/casillas');
const jugadores_p = require('./routes/fase_produccion/jugadores');
const partidas_p = require('./routes/fase_produccion/partidas');

const casillas_m = require('./routes/FaseMovimiento/casillas.js');
const jugadores_m = require('./routes/FaseMovimiento/jugadores.js');
const partidas_m = require('./routes/FaseMovimiento/partidas.js');
const users_m = require('./routes/FaseMovimiento/users.js');

const partidas = require('./routes/partidas.js');
const tablero = require('./routes/tablero.js');
const jugadores = require('./routes/jugadores.js');
const usuarios = require('./routes/usuarios.js');
const authRoutes = require('./routes/authentication.js')

dotenv.config();

const router = new Router();

router.use('/users-p', users_p.routes());
router.use('/casillas-p', casillas_p.routes());
router.use('/jugadores-p', jugadores_p.routes());
router.use('/partidas-p', partidas_p.routes());

router.use('/casillas_m', casillas_m.routes());
router.use('/jugadores_m', jugadores_m.routes());
router.use('/partidas_m', partidas_m.routes());
router.use('/users_m', users_m.routes());

router.use('/partidas', partidas.routes());
router.use('/tablero', tablero.routes());
router.use('/jugadores', jugadores.routes());

router.use(authRoutes.routes());

router.use('/usuarios', usuarios.routes());

router.use(jwtMiddleware( { secret: process.env.JWT_SECRET } ))



module.exports = router;