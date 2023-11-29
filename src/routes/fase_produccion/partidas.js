const Router = require('koa-router');
const router = new Router();



//Crear partida
router.post("partida.create", "/", async(ctx) => {

    try {
        const partida = await ctx.orm.Partida.create(ctx.request.body);
        ctx.body = partida;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }

})

//Listar partidas
router.get("partida.list", "/", async(ctx) => {
    try {
        const partida = await ctx.orm.Partida.findAll();
        ctx.body = partida;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})


//buscar partida por id
router.get("partida.show", "/produccion/:id", async(ctx) => {
    try {
        const partida = await ctx.orm.Partida.findOne({ where: { id: ctx.params.id } });
        if (jugador) {
            ctx.body = partida;
            ctx.status = 200;
        } else {
            ctx.body = { error: "Partida no encontrada" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
});

module.exports = router;