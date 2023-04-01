const Joi = require("joi");
exports.schema = {
  login: Joi.object({//const {username, password} = ctx.request.body
    username: Joi.string().max(10).required().error(new Error("body-username是string必須參數,最小為3位,最大为10位")),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/)
      .required()
      .error(new Error("body-password是string必須參數,格式为大小写字母各一个，至少8位，至多16位"))
  })
}