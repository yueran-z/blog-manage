const { server } = require("../src/index.js")

/**bootstrap */
const {PORT} = server.context.config
const listenHandler = () => { console.log(`${PORT}啓動！`); }
server.listen(PORT, listenHandler)