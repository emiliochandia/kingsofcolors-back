const Router = require('koa-router');

const router = new Router();

router.post("partidas.create","/",async(ctx)=>{
    try{
        const partida = await ctx.orm.Partida.create(ctx.request.body);
        ctx.body = partida;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;
