// 每個modal就是映射數據庫的一張表
const { Model, DataTypes } = require('sequelize');
const moment = require('moment');
const {sha256Hash} = require('../tools/hash')//必須解構，不然會報not a fn
const config = require('../config')

class User extends Model { }

module.exports = sequelize => {
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "用户名"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "密码",
      set (val) {
        const newVal = sha256Hash(
          val,//原來的值
          config.SECRET_KEY.PASSWORD//加密的值
        )
        this.setDataValue("password", newVal)//把值hash一下
      }
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
  return User
}