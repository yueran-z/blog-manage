const Koa = require('koa')
const routerHandler = require('./handler/routes')
const log4js = require('koa-log4')
const { resolve } = require('path')
class CustomKoa extends Koa {
  /**koa中批量注册middlewares
   * @param {import("koa").Midlewares[]} middlewares 
   */
  useMiddlewares (middlewares = []) {
    middlewares.forEach(this.use, this)
  }
  /**
   * 路由自動導入路徑/自動注冊
   * @param {string} dirPath 
   */
  useRouters (dirPath) {
    const dirPathIsString = typeof dirPath === 'string'

    if (!dirPathIsString) {
      throw new Error('路由目錄dirpath必須是string類型必需參數')
    }
    this.use(routerHandler({ dirPath }))
  }

  /**
   * ctx擴展
   * @param {object} props 
   */
  extendContext (props) {
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        const hasProp = Boolean(this.context[key]);
        if (hasProp) {
          throw new Error("context props 已存在，請更換擴展屬性名稱")
        }

        this.context[key] = props[key]
      }
    }
  }
  /**
   * 日志(應用級)
   * @param {string} dirPath 
   */
  useLogger (dirPath) {
    const dirPathIsString = typeof dirPath === "string"
    if (!dirPathIsString) {
      throw new Error("日志目錄路徑為string類型必須參數")
    }
    log4js.configure({
      pm2: true,
      disableClustering: true,
      appenders: {
        access: {
          type: "dateFile",
          pattern: "-yyyy-MM-dd.log",
          alwaysIncludePattern: true,
          daysToKeep: 60,
          filename: resolve(dirPath, "access/access.log")
        },
        app: {
          type: "dateFile",
          pattern: "-yyyy-MM-dd.log",
          alwaysIncludePattern: true,
          daysToKeep: 60,
          filename: resolve(
            dirPath,
            "application/error.log"
          )
        },
      },
      categories: {
        default: {
          appenders: ["access"], level: "info"
        },
        app: {
          appenders: ["app"],
          level: "WARN"
        }
      }
    })

    const appLogger = log4js.getLogger("app")
    this.on('error', err => appLogger.error(err))
  }
}
module.exports = CustomKoa