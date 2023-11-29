const Router = require('koa-router');

const router = new Router();

router.post("jugadores.create", "/", async (ctx) => {
    try {
        const jugadores = ctx.request.body;
        const createdPlayers = await Promise.all(jugadores.map((player) => ctx.orm.Jugador.create(player)));
        ctx.body = createdPlayers;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});

module.exports = router;