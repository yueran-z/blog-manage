const Joi = require("joi");
// 校驗前端參數
exports.schema = {
  index: Joi.object({
    limit: Joi.number()
      .min(0)
      .default(5)
      .error(Error("query-limit为number类型,最小值为0")),
    page: Joi.number()
      .min(1)
      .default(1)
      .error(Error("query-page为number类型,最小值为1")),
    type: Joi.array()
      .empty("")
      .items(Joi.valid("blogs", "books"))
      .single()
      .default(["blogs", "books"])
      .error(Error("query-type为string类型且范围为[ blogs, books]")),
  }),
  get: Joi.object({
    id: Joi.number()
    .required()
      .error(Error("param-id为number类型必須參數")),
  }),
  create: Joi.object({
    title: Joi.string()
      .required()
      .error(Error("body-title为string类型必需参数")),
    synopsis: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-synopsis为string类型参数")),
    type: Joi.string()
      .valid("blogs", "books")
      .required()
      .error(Error("body-type为string类型且范围为[ blogs, books]")),
    content: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-synopsis为string类型参数"))
  }),
  update: Joi.object({
    id: Joi.number()
      .required()
      .error(Error("param-id为number类型必須參數")),
    title: Joi.string()
      .empty("")
      .default("")
      .error(Error("param-title为string类型参数")),
    synopsis: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-synopsis为string类型参数")),
    type: Joi.string()
      .valid("blogs", "books")
      .required()
      .error(Error("body-type为string类型且范围为[ blogs, books]")),
    content: Joi.string()
      .empty("")
      .default("")
      .error(Error("body-synopsis为string类型参数"))
  }),

  delete: Joi.object({
    id: Joi.number()
      .required()
      .error(Error("param-id为number类型必須參數")),
  }),
}