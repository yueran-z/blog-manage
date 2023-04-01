const context = {}
const config = require("../config")

context.config = config


/**
 * ctx下擴展錯誤處理
 * @param {any} data 
 * @param {number} status {default:200}
 */
// .前面的是誰，this就指的是誰
context.success = function (data, status = 200) {
  const statusIsNumber = typeof status === "number"
  if (!statusIsNumber) {
    throw new Error("status must be a number!")
  }
  this.status = status
  this.body = { msg: "success", status, data }
}

/**
 * ctx下擴展錯誤處理
 * @param {any} reason
 * @param {number} status {default:500}
 */
context.fail = function (reason, status = 500) {
  const statusIsNumber = typeof status === "number"
  if (!statusIsNumber) {
    throw new Error("status must be a number!")
  }
  this.status = status
  this.body = { msg: "fail", status, reason }
}
/**
 * ctx下挂載model
 */
const model = require("../model")
context.model = model

module.exports = context