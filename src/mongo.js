'use strict'
const MongoClient = require('mongodb').MongoClient

const proxyHandler = {
  get (target, name) {
    if (name === 'client') {
      return target.client
    }
    if (name === 'db') {
      return target.db
    }
    return target.db.collection(name)
  }
}

function connect (url = process.env.MONGO_URL, base = process.env.BASE) {
  console.log('conneting to', url.replace(/(^mongodb:.*:).*?(@.*)/, '$1******$2'), base)
  const client = MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const deferred = {
    client: client.then(client => {
      console.log('connected to mongo')
      deferred.db = client.db(base)
      return client
    })
  }

  return new Proxy(deferred, proxyHandler)
}

exports.connect = connect
