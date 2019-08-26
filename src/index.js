exports.app = require('./src/express')
exports.db = require('./src/mongo').connect(process.env.MONGO_URL, process.env.MONGO_BD)
