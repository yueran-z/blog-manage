/**
 * 
 * @type {Custom.IRouter} 
 */
const users = require('../controller/users')
module.exports = router =>{
  router.prefix("/users")
  /**
   * @type {Custom.IMiddleware}
   */
  router.post('/login', users.login)

}