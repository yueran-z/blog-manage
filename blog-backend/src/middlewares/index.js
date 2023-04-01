const errorHandler = require("./handler/error")
const log4js = require('koa-log4')
const bodyParser = require("koa-body")//

/**
 * 訪問級別錯誤
 */
module.exports = [
  log4js.koaLogger(log4js.getLogger("http"), { level: "auto", }),
  errorHandler(),
  bodyParser()//參數驗證支持
]