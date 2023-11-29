const Router = require('koa-router');
const router = new Router();

//crea casillas
router.post("casillas.create", "/", async(ctx) => {

    try {
        const casilla = await ctx.orm.Casilla.create(ctx.request.body);
        ctx.body = casilla;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }

})


//muestra todas las casillas
router.get("casillas.list", "/", async(ctx) => {
    try {
        const casilla = await ctx.orm.Casilla.findAll();
        ctx.body = casilla;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})

//borrar todas las casillas 
router.delete("casillas.deleteAll", "/deleteall", async(ctx) => {
    try {
        await ctx.orm.Casilla.destroy({
            where: {},
            truncate: true
        });

        ctx.body = "Todas las casillas han sido eliminadas correctamente.";
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});


//busca casilla por id
router.get("casillas.show", "/produccion/casilla/:id", async(ctx) => {
    try {
        const casilla = await ctx.orm.Casilla.findOne({ where: { id: ctx.params.id } });
        if (casilla) {
            ctx.body = casilla;
            ctx.status = 200;
        } else {
            ctx.body = { error: "Casilla no encontrada" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
})


//busca casillas por color
router.get("casillas.show", "/produccion/color/:color", async(ctx) => {
    try {
        const casilla = await ctx.orm.Casilla.findAll({ where: { color: ctx.params.color } });


        if (casilla) {
            ctx.body = casilla;
            ctx.status = 200;
        } else {
            ctx.body = { error: "Casilla no encontrada" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
})


//busca casillas por id_dueño
router.get("casillas.show", "/produccion/dueno/:id_dueno", async(ctx) => {
    try {
        const casilla = await ctx.orm.Casilla.findAll({ where: { id_dueno: ctx.params.id_dueno } });

        if (casilla) {

            ctx.body = casilla;
            ctx.status = 200;
        } else {
            ctx.body = { error: "Casilla no encontrada" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
})



//todas las fichas por casilla con su dueño
router.get("casillas.list", "/produccion/fichas", async(ctx) => {
    try {
        const casillas = await ctx.orm.Casilla.findAll();
        const fichas = casillas.map(casilla => {
            return {
                tipo_ficha: casilla.tipo_ficha,
                id_dueno: casilla.id_dueno
            };
        });
        console.log(fichas)
        ctx.response.body = fichas;
        ctx.response.status = 200;
    } catch (error) {
        ctx.response.body = error;
        ctx.response.status = 400;
    }
})


//obtener produccion total de un jugador
router.get("casillas.show", "/produccion/total/:id_dueno", async(ctx) => {
    try {
        const casillas = await ctx.orm.Casilla.findAll({ where: { id_dueno: ctx.params.id_dueno } });

        const totalProduccion = casillas.reduce((total, casilla) => {
            return total + casilla.valor_produccion;
        }, 0);

        const dueno = ctx.params.id_dueno;

        ctx.response.body = {
            id_dueno: dueno,
            totalProduccion: totalProduccion
        };
        ctx.response.status = 200;
    } catch (error) {
        ctx.response.body = error;
        ctx.response.status = 400;
    }
})



//mover tropas
router.post("casillas.update", "/produccion/mover-tropas/:id_dueno", async(ctx) => {
    try {
        const { id_casilla_act, id_casilla_nueva, tropas_movidas, id_jugador } = ctx.request.body;

        if (id_jugador == ctx.params.id_dueno) {

            const casilla_act = await ctx.orm.Casilla.findOne({ where: { id: id_casilla_act, id_dueno: ctx.params.id_dueno } });
            const casilla_nueva = await ctx.orm.Casilla.findOne({ where: { id: id_casilla_nueva, id_dueno: ctx.params.id_dueno } });


            if (casilla_act.id_dueno == id_jugador && casilla_nueva.id_dueno == id_jugador) {
                if (casilla_act.tropas - tropas_movidas >= 1) {

                    await ctx.orm.Casilla.update({ tropas: casilla_act.tropas - tropas_movidas }, { where: { id: id_casilla_act } });
                    await ctx.orm.Casilla.update({ tropas: casilla_nueva.tropas + tropas_movidas }, { where: { id: id_casilla_nueva } });

                } else {
                    ctx.response.body = { error: "No puedes dejar tu territorio sin tropas. Debes dejar al menos 1" };
                    ctx.response.status = 404;
                };
            } else {
                ctx.body = { error: "No puedes mover tropas a territorios que no controlas" };
                ctx.response.status = 404;

            };
            ctx.response.body = {
                "tropas_en_casilla_act": casilla_act.tropas,
                "tropas_en_casilla_nueva": casilla_nueva.tropas
            };
        } else {
            ctx.body = { error: "No puedes mover tropas a territorios que no controlas" };
            ctx.response.status = 404;

        }

        ctx.response.status = 200;
    } catch (error) {
        ctx.response.body = { error: "Error interno del servidor." };
        ctx.response.status = 500;
    }

})






module.exports = router;