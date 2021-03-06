const bodyParser = require('body-parser')
// var throttle = require('express-throttle')

const app = require('express')()

function configure () {
  app.enable('trust proxy')
  app.use(require('compression')())
  app.use(bodyParser.json({ strict: false }))
  app.use(bodyParser.raw())
  app.use(bodyParser.text())
  // app.use(throttle({ burst: 30, rate: '5/s' }))

  app.use(function (req, res, next) {
    res.error = (error, info) => {
      if (error.isJoi) {
        return res.json({
          error: `${error.details[0].context.key}_Validation`,
          info: error
        })
      }
      res.json({ error, info })
    }
    next()
  })

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
