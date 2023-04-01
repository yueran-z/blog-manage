const Router = require('@koa/router')
const glob = require("glob")
const compose = require('koa-compose')
const { resolve } = require('path')

const routerHandler = (options = {}) => {
  const rootRouter = new Router() //定義一個根路由

  const {dirPath} = options
  // const dirPath = resolve(__dirname, "../../routers")
  const pattern = resolve(dirPath, "**/*.js")//路徑拼接得到絕對路徑
console.log(glob.sync(pattern))
  const routes = glob //路由表
    .sync(pattern)
    .map(require)
    .filter(router => typeof router === 'function')
    .map(fn => {
      const router = new Router()
      fn(router)//把路由注冊進fn
      return router.routes()
    })

  rootRouter.use(...routes)//路由表都自动注册到根路由！！
  return compose([
    rootRouter.routes(),
    rootRouter.allowedMethods()
  ])

}
module.exports = routerHandler