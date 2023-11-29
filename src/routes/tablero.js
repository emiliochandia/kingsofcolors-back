const Router = require('koa-router');

const router = new Router();

router.post("tablero.create","/create",async(ctx)=>{
    try{
        const tablero = ctx.request.body
        tablero.map((casilla) => ctx.orm.Casilla.create(casilla));
        ctx.body = tablero;
        ctx.status = 201;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;