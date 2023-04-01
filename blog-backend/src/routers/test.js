module.exports = router => {
  router.prefix("/test")
  router.get('/', async (ctx, next) => {
    ctx.body = ctx.config.PORT
    
  })


}

