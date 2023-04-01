const CustomKoa = require("./custom/app")
const middlewares = require('./middlewares')
const context = require("./extend/context")
const { resolve } = require('path')


/**koa中批量注册middlewares */
// const middlewares = [async(ctx,next)=>{}] 抽成handle
// middlewares.forEach(app.use, app) 抽成自动注册app.js
// middlewares.forEach(middleware => app.use(middleware)
const app = new CustomKoa()
app.useMiddlewares(middlewares)
app.useRouters(resolve(__dirname, "./routers"))
app.extendContext(context)
app.useLogger(resolve(__dirname, "../logs"))
module.exports = { server: app }