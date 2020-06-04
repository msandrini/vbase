const express = require('express')
const routing = require('./server/routes')

const app = express()

// sets port
app.set('port', (process.env.PORT || 5000))

// connect to DB and then continue to routing
routing(app)

// final listener (http)
app.listen(app.get('port'), () => {
  console.log('Page-server app is running HTTP on port ' + app.get('port'))
})

process.on('uncaughtException', function (err) {
  console.log(err)
})
