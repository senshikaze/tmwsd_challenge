const express = require('express')
const app = express()
const port = 3000

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('messages.db')
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS messages (title TEXT, message TEXT)"
  )
})

app.use('/assets', express.static('./assets'))
const messagesRoute = require('./routes/messages')
app.use(express.urlencoded({extended: true}))
app.use('/', messagesRoute)
app.set('view engine', 'pug')

app.listen(port, () => {
  console.log(`TMWSD is listening at http://localhost:${port}`)
})

db.close()
