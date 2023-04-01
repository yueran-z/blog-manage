/**
 * 全局錯誤處理
 * @type {Custom.IMiddlewareHandler}
 */

const errorHandler = (options = {}) => {

  // options

  // 返回一個中間件：return async (ctx, next) => {}
  return async (ctx, next) => {
    try {
      await next()
      const { body, status } = ctx
      const isNotFound = status === 400 && !body
      if (isNotFound) {
        ctx.success("资源未找到",status)
      }
    } catch (error) {
      let { status =500, message } = error

      const parameterErrorKeywords = [
        "body",
        "query",
        "param"
      ]

      const isParameterError = parameterErrorKeywords.some(keyword => message.includes(keyword))
      if (isParameterError) {
        status = 400
      }

      const isProd = ctx.app.env === "production"
      const isServerError = status === 500
      const isProdServerError = isProd && isServerError

      if (isProdServerError) {
        message = "server error"
      }
      ctx.fail(message, status)
      ctx.app.emit("error", { message, status })

    }
  }
}

module.exports = errorHandler