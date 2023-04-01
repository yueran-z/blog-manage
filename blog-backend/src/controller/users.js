const { schema } = require("../pipe/users")
const { sha256Hash } = require('../tools/hash')//必須解構，不然會報not a fn
const jsonwebtoken = require("jsonwebtoken")
/**
 * @type{Custom.controller<"login" | "register">}
 */
module.exports = {

  async login (ctx, next) {
    // 驗證后得到username,password
    const { username, password } = await schema.login.validateAsync(ctx.request.body)

    // 用戶能否找到
    const user = await ctx.model.User.findOne({
      where: { username }
    })

    if (!user) {
      return ctx.fail("用户不存在，请重新确认用户名", 400)
    }

    // 密碼是否正確
    const passwordIsEqual = user.password === sha256Hash(password, ctx.config.SECRET_KEY.PASSWORD)

    if (!passwordIsEqual) {
      return ctx.fail("密码错误，请重新确认密码", 400)
    }

    //當username和password都成功通過，生成一個token
    const payload = {
      id: user.id,
      username: user.username,
    }
    const token = jsonwebtoken.sign(payload, ctx.config.SECRET_KEY.TOKEN, { expiresIn: "7d" })

    ctx.success({ ...payload, token })//{ username, password}
    await next()
  },

  async register (ctx, next) { },

}