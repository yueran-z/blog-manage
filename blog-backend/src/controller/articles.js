const { TEXT } = require("sequelize");
const article = require("../model/article");
const { schema } = require("../pipe/articles")
/**
 * @type {Custom.Controller}
 */
module.exports = {
  async index (ctx, next) {
    console.log("ctx.query", ctx.query);
    const { limit, page, type } = await schema.index.validateAsync(ctx.query)

    const offset = limit * (page - 1)
    // 拿到全部
    const articles = await ctx.model.Article.findAndCountAll({
      limit,
      offset,
      order: [["id", "DESC"]], //新建的排在前面
      where: { type } //查詢條件
    })
    ctx.success(articles)
    await next()
  },
  async get (ctx, next) {
    const { id } = await schema.get.validateAsync(ctx.params)

    const articleById = await ctx.model.Article.findByPk(id, {
      include: {
        model: ctx.model.User,
        attributes: {exclude: ['password']}
      }
    })

    if (!articleById) {
      return ctx.success("文章未找到,請確認文章id", 404)
    }
    ctx.success(articleById)

  },
  async create (ctx, next) {
    const { id: user_id } = ctx.state.user
    console.log("ctx.state裏面包括:", ctx.state);
    const newInfo = await schema.create.validateAsync(ctx.request.body)

    const article = await ctx.model.Article.create({ ...newInfo, UserId: user_id })

    ctx.success(article)
    await next()
  },
  // 獲取權限(走一層router中間件JWT) 校驗前端傳的參數 
  async update (ctx, next) {
    const {id:user_id} =ctx.state.user
    const {id, ...newInfo} = await schema.update.validateAsync({...ctx.params,...ctx.request.body}) //前端傳入的數據
    console.log("id", id);

    const articleById = await ctx.model.Article.findByPk(id)
    if (!articleById){
      return ctx.fail("更新文章失敗,文章未找到,請確認文章Id", 400)//傳回前端
    }
    console.log("articleById", articleById);

    const userIdIsEqual = articleById.UserId === user_id;
    if(!userIdIsEqual){
      return ctx.fail("該用戶無權限更新此文章",401)//傳回前端
    }
    await articleById.update(newInfo)
    ctx.success(articleById,201) //傳回前端
    await next()
  },
  async delete (ctx, next) {
    const { id: user_id } = ctx.state.user
const {id } = await schema.delete.validateAsync(ctx.params)

const articleById = await ctx.model.Article.findByPk(id)
    if (!articleById) {
      return ctx.fail("删除文章失敗,文章未找到,請確認文章Id", 400)//傳回前端
    }
    const userIdIsEqual = articleById.UserId === user_id;
    if (!userIdIsEqual) {
      return ctx.fail("該用戶無權限更新此文章",401)//傳回前端
    }
    await articleById.destroy()
    ctx.success(null, 204) //傳回前端
    await next()

  }
}