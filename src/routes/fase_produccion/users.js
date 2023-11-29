const Router = require('koa-router');
const router = new Router();


//crear user
router.post("users.create", "/", async(ctx) => {

    try {
        const user = await ctx.orm.Usuario.create(ctx.request.body);
        ctx.body = user;
        ctx.status = 201;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }

})

//listar users
router.get("users.list", "/", async(ctx) => {
    try {
        const user = await ctx.orm.Usuario.findAll();
        ctx.body = user;
        ctx.status = 200;
    } catch (error) {
        ctx.body = error;
        ctx.status = 400;
    }
})


//encontrar user por id
router.get("user.show", "/produccion/:id", async(ctx) => {
    try {
        const user = await ctx.orm.Usuario.findOne({ where: { id: ctx.params.id } });
        if (user) {
            ctx.body = user;
            ctx.status = 200;
        } else {
            ctx.body = { error: "Usuario no encontrado" };
            ctx.status = 404;
        }
    } catch (error) {
        ctx.body = error;
        ctx.status = 500;
    }
});

module.exports = router;