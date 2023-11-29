const Router = require('koa-router');

const router = new Router();

router.post("partida.create","/FaseMovimiento",async(ctx)=>{
    try{
        const partida = await ctx.orm.Partida.create(ctx.request.body);
        ctx.body = partida;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

router.get("partida.list","/FaseMovimiento/partida",async(ctx)=>{
  try{
      const partida = await ctx.orm.Partida.findAll();
      ctx.body = partida;
      ctx.status = 200;
  } catch(error){
      ctx.body = error;
      ctx.status = 400;
  }
})

router.get("partida.show","/FaseMovimiento/:id",async(ctx)=>{
    try{
        const partida = await ctx.orm.Partida.findOne({where:{id:ctx.params.id}});
        ctx.body = partida;
        ctx.status = 200;

    if (partida) {
        if (partida.fase === "movimiento") {
          ctx.body = "La fase de la partida es movimiento.";
          ctx.status = 200;
        } else {
          ctx.body = "La fase de la partida no es movimiento.";
          ctx.status = 200;
        }
      } else {
        ctx.body = "Partida no encontrada.";
        ctx.status = 404;
      }
    } catch (error) {
      ctx.body = error;
      ctx.status = 400;
    }
})

module.exports = router;