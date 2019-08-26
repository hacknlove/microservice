const bodyParser = require('body-parser')
var throttle = require('express-throttle')

const app = require('express')()

function configure () {
  app.enable('trust proxy')
  app.use(require('compression')())
  app.use(bodyParser.json({ strict: false }))
  app.use(bodyParser.raw())
  app.use(bodyParser.text())
  app.use(throttle({ rate: '5/s' }))
  return app
}

function connect (ip = '0.0.0.0', port = 5000) {
  const server = require('http').createServer(app)
  server.listen(port, ip)
  console.log(`listen at ${ip}:${port}`)
  return app
}

app.configure = configure
app.connect = connect
module.exports = app
