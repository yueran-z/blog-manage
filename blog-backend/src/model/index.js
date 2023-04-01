const { Sequelize, DataTypes } = require('sequelize');
const useUser = require('./user')
const useArticle = require('./article')
const config = require('../config')
const moment = require('moment')

// 建立數據庫
const sequelize = new Sequelize({
  ...config.MODEL,
  hooks: {//在更新的時機hooks中去更新一下時間戳！！
    beforeUpdate (instance) {
      instance.set("updatedAt", moment().format("YYYY-MM-DD HH:mm"))
    }
  }
  // dialect: "mysql",
  // database: "antd-blogs",
  // username: "root",
  // password: "root",
  // host: "localhost",
  // timezone: "+08:00",
  // logging: false
})

const User = useUser(sequelize)
const Article = useArticle(sequelize)

User.hasMany(Article)//數據表建立關聯,會在articles表生成默認的UserId
Article.belongsTo(User)

sequelize.sync({ alter: true })//數據庫創建方式：同步

  ; (async () => {//創建一個默認用戶
    const user = await User.findOne({
      where: { username: "testUser" }
    })

    if (user) {
      return
    }

    await User.create({
      username: "testUser",
      password: "aA123aaaaaa"
    })
  })()


module.exports = {//最後一步：把model挂在context.js的ctx(this.xxx)使用
  User,
  Article
}