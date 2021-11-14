const express = require('express'),
      cors = require('cors'),
      dbObject = require('./db/conn'),
      app = express(),
      fileUpload = require('express-fileupload')

app.use(express.json()) 
app.use(cors())
app.use(fileUpload())

const users = require('./routers/api/users')
const lesson = require('./routers/api/lesson')
const roles = require('./routers/api/roles')
app.use('/api/users', users)
app.use('/api/lesson', lesson)
app.use('/api/roles', roles)

app.use('/static', express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/public/'))
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

const port = process.env.PORT || 5000

dbObject.connectToServer.then(() => {
  console.log('Success connected MongoDB')
  app.listen(port, () => console.log(`Server started on port http://localhost:${port}`))
}).catch(err => 
  console.log(err, 'Failed Connect MongoDB'))