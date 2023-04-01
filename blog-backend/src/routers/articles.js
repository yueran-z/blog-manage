const articles = require("../controller/articles")
const { config } = require("../extend/context")
const jwt = require("koa-jwt")
/**
 * 
 * @type {Custom.IRouter} 
 */
module.exports = router =>{
  router.prefix("/articles")
//路由中間件和token: 關聯用戶后才可以進行文章操作：驗證token后才可以進行POST/PUT/DEL操作
router.use(
  jwt({
    secret:config.SECRET_KEY.TOKEN
  }).unless({method: ["GET"]})
)

  router.get('/', articles.index)
  router.get('/:id', articles.get)
  router.post('/', articles.create)
  router.put('/:id', articles.update)
  router.del('/:id', articles.delete)


}

