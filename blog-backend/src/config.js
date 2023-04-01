const config ={}
config.PORT=3000
/**
 * @type {import("sequelize").Options} 創建model
 */
config.MODEL = {
  dialect: "mysql",
  database: "antd-blogs",
  username: "root",
  password: "root",
  host: "localhost",
  timezone: "+08:00",
  logging: false
}
/**
 * hash加密值
 */
config.SECRET_KEY = {
  PASSWORD: "ASGFSEBRS@*&!#$(@**",
  TOKEN:"SDBFEAIVFEHR@#$%$&^)"
}
module.exports = config