const Router = require('koa-router');

const router = new Router();

router.post("usuario.create","/FaseMovimiento",async(ctx)=>{
    try{
        console.log("l");
        const usuario = await ctx.orm.Usuario.create(ctx.request.body);
        console.log("ji")
        ctx.body = usuario;
        ctx.status = 201;
        console.log('ma');
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
        console.log('ma2');
    }
})

router.get("users.list","/FaseMovimiento",async(ctx)=>{
    try{
        const users = await ctx.orm.Usuario.findAll();
        ctx.body = users;
        ctx.status = 200;
    } catch(error){
        ctx.body = error;
        ctx.status = 400;
    }
})

module.exports = router;