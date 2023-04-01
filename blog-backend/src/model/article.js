const { Model, DataTypes } = require('sequelize');
const moment = require('moment');
class Article extends Model { }

module.exports = sequelize => {
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "标题"
      },

      synopsis: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: "",
        comment: "簡介"
      },
      type: {
        type: DataTypes.ENUM,
        values: ["blogs", "books"],
        allowNull: false,
        comment: "类型[blogs, books]"
      },
      content: {
        type: DataTypes.TEXT("MEDIUM"),
        allowNull: true,
        defaultValue: "",
        comment: "具体内容"
      },
      createdAt: {
        type: DataTypes.STRING,
        defaultValue () {
          return moment().format("YYYY-MM-DD HH:mm")
        }
      },
      updatedAt: {
        type: DataTypes.STRING,
        defaultValue () {
          return moment().format("YYYY-MM-DD HH:mm")
        }
      },
    },
    {
      sequelize,
      timestamp: false
    }
  )
  return Article
}