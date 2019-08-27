'use strict'
const MongoClient = require('mongodb').MongoClient

const proxyHandler = {
  async get (target, name) {
    if (name === 'then') {
      return target.client.then
    }
    if (name === 'catch') {
      return target.client.catch
    }
    if (name === 'db') {
      return target.db
    }
    return target.db.collection(name)
  }
}

function connect (url = process.env.MONGO_URL, base = process.env.BASE) {
  const dynamic = {}

  const client = MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const deferred = {
    client
  }

  client.then(client => {
    deferred.db = client.db(base)
  })

  return new Proxy(dynamic, proxyHandler)
}

exports.connect = connect
