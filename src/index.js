exports.app = require('./express')
exports.db = require('./mongo').connect(process.env.MONGO_URL, process.env.MONGO_BD)
