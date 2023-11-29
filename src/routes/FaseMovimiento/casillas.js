const Router = require('koa-router');

const router = new Router();

router.post("casillas.create","/FaseMovimiento/crear",async(ctx)=>{
    try{
        const casilla = await ctx.orm.Casilla.create(ctx.request.body);
        ctx.body = casilla;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("casillas.list","/FaseMovimiento/casillas",async(ctx)=>{
    try{
        const casilla = await ctx.orm.Casilla.findAll();
        ctx.body = casilla;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("casillas.show","/FaseMovimiento/:id",async(ctx)=>{
    try{
        const casilla = await ctx.orm.Casilla.findOne({
            where:{id:ctx.params.id}});
        ctx.body = casilla;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("casillas_partida.show", "/FaseMovimiento/partida/:id_partida", async (ctx) => {
    try {
      const casillasFichaMovimiento = await ctx.orm.Casilla.findAll({
        where: {
          id_partida: ctx.params.id_partida,
          tipo_ficha: "movimiento",
          activacion_ficha: false,
        },
      });
  
      if (casillasFichaMovimiento.length > 0) {
        const dueñosIds = casillasFichaMovimiento.map((casilla) => [casilla.id, casilla.id_dueno]);
        
        //casillasFichaMovimiento.activacion_ficha = true;

        ctx.body = dueñosIds;
        ctx.status = 200;
      } else {
        ctx.body = "No se encontraron casillas de tipo 'movimiento' en esta partida.";
        ctx.status = 404;
      }
    } catch (error) {
      ctx.body = error;
      ctx.status = 400;
    }
  });

  router.get("casillas.mov", "/FaseMovimiento/realizar_mov/:id", async (ctx) => {
    try {
        const { id } = ctx.params;
        const casilla = await ctx.orm.Casilla.findOne({
            where: { id }
        });

        if (!casilla) {
            ctx.body = "La casilla no existe.";
            ctx.status = 404;
            return;
        }

        if (casilla.id_dueno === 0) {
            const { id_casilla_anterior, id_dueno, tropas_a_mover } = ctx.request.query;

            const casillaAnterior = await ctx.orm.Casilla.findOne({
                where: { id: id_casilla_anterior},
            });

            if (!casillaAnterior || !sonCasillasAdyacentes(casilla, casillaAnterior)) {
                ctx.body = "La casilla anterior no existe o no es adyacente a la casilla actual.";
                ctx.status = 400;
                return;
            }

            if (casillaAnterior.tropas - tropas_a_mover < 1) {
                ctx.body = "La casilla anterior no tiene suficientes tropas para mover.";
                ctx.status = 400;
                return;
            }

            casillaAnterior.tropas = casillaAnterior.tropas - parseInt(tropas_a_mover, 10);
            casilla.tropas = casilla.tropas + parseInt(tropas_a_mover, 10);
            casilla.id_dueno = id_dueno;
            casillaAnterior.activacion_ficha = true;
            //casillaAnterior.activacion_ficha = false;
            //casillaAnterior.tipo_ficha = "none";

            await casillaAnterior.save();
            await casilla.save();

            ctx.body = "Movimiento realizado con éxito.";
            ctx.status = 200;
        } else {
            ctx.body = "La casilla ya tiene un dueño.";
            ctx.status = 400;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
});


function sonCasillasAdyacentes(casillaActual, casillaAnterior) {
    const q1 = casillaActual.q;
    const r1 = casillaActual.r;
    const s1 = casillaActual.s;
    const q2 = casillaAnterior.q;
    const r2 = casillaAnterior.r;
    const s2 = casillaAnterior.s;

    const adyacentes = [
        { q: 0, r: -1, s: 1 },
        { q: 1, r: -1, s: 0 },
        { q: 1, r: 0, s: -1 },
        { q: 0, r: 1, s: -1 },
        { q: -1, r: 1, s: 0 },
        { q: -1, r: 0, s: 1 },
    ];

    for (const adyacente of adyacentes) {
        if (q1 + adyacente.q === q2 && r1 + adyacente.r === r2 && s1 + adyacente.s === s2) {
           
            if (Math.abs(q1 + adyacente.q) <= 3 && Math.abs(r1 + adyacente.r) <= 3 && Math.abs(s1 + adyacente.s) <= 3) {
                return true;
            }
        }
    }

    return false;
}



module.exports = router;
  