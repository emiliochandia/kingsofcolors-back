const Router = require('koa-router');
const router = new Router();


//crear jugador
router.post("jugadores.create", "/", async(ctx) => {

    try {
        const jugador = await ctx.orm.Jugador.create(ctx.request.body);
        ctx.body = jugador;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }

})

//mostrar todos los jugadores
router.get("jugador.list", "/", async(ctx) => {
    try {
        const jugador = await ctx.orm.Jugador.findAll();
        ctx.body = jugador;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//mostrar todos los jugadores de una partida 
router.get("jugador.show", "/produccion/:id", async(ctx) => {
    try {
        const jugador = await ctx.orm.Jugador.findOne({ where: { id: ctx.params.id } });
        if (jugador) {
            ctx.body = jugador;
            ctx.status = 200;
        } else {
            ctx.body = { error: "Jugador no encontrado" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
})



router.post("jugadores.update", "/produccion/nuevo-total/:id", async(ctx) => {
    try {
        const jugador = await ctx.orm.Jugador.findOne({ where: { id: ctx.params.id } });

        if (jugador) {
            const { prod_total } = ctx.request.body;
            console.log(prod_total)

            if (prod_total) {
                jugador.producción_total = prod_total;
                await jugador.save();

                ctx.body = jugador;
                ctx.status = 200;

            } else {
                ctx.body = { error: "La produccion total no fue proporcionado" };
                ctx.status = 400;
            }

        } else {
            ctx.body = { error: "Jugador no encontrado" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
})



//Mostrar el estado de los jugadores de una partida 
router.get("jugador.show", "/produccion/jugadores-en-partida/:id_partida", async(ctx) => {
    try {
        const jugadores = await ctx.orm.Jugador.findAll({ where: { id_partida: ctx.params.id_partida } });
        console.log(jugadores)
        if (jugadores) {
            ctx.body = jugadores;
            ctx.status = 200;
        } else {
            ctx.body = { error: "Partida no encontrada" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
})



module.exports = router;