const Router = require('koa-router');

const router = new Router();

router.post("jugador.create","/FaseMovimiento",async(ctx)=>{
    try{
        const jugador = await ctx.orm.Jugador.create(ctx.request.body);
        ctx.body = jugador;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})


module.exports = router;