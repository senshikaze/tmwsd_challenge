const { rejects } = require('assert')
var express = require('express')
const { render } = require('express/lib/response')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('messages.db')
var router = express.Router()

/**
 * Set DEFAULT_TIMEOUT to force redirect on message page
 */
var DEFAULT_TIMEOUT = 0//120

/** GET all messages and show create new */
router.get('/', async function (req, res) {
  let messages = [];

  await new Promise((resolve, reject) => {
    return db.each("SELECT * FROM messages", (err, row) => {
      messages.push({id: row.message_id, title: row.title, message: row.message})
    }, (err, n) => (err) ? reject(err) : resolve())
  })

  //Note: `Cache-Control: no-store` is so that the browser won't cache for back button
  res.header({"Cache-Control": "no-store"})
  res.render('messages/index', {
    page: 'Messages',
    messages: messages
  })
})

/** POST a new message */
router.post('/', function (req, res) {
  let errors = {};
  if (!req.body.title || req.body.title == "") {
    errors.title = "Must have title!"
  }
  if (!req.body.message || req.body.message == "") {
    errors.message = "Must have message!"
  }

  if (errors.title || errors.message) {
    res.header({"Cache-Control": "no-store"})
    res.render('messages/index', {
      page: 'Messages',
      errors: errors,
      values: {
        title: req.body.title ?? "",
        message: req.body.message ?? "",
      }
    })
    return
  }

  try {
    // reference: https://stackoverflow.com/a/8084248
    let id = (Math.random()+1).toString(36).substring(2);
    // it is possible in some edge cases to get ""
    while (id == "") {
      id = (Math.random()+1).toString(36).substring(2);
    }
    const statement = db.prepare("INSERT INTO messages (message_id, title, message) VALUES (?,?,?)")
    statement.run(id, req.body.title, req.body.message)
    statement.finalize()
    res.redirect("/")
  } catch (e) {
    console.error(e)
    errors.unknown = e.message
  }
})

/** GET a single message by id */
router.get('/messages/:id', async function (req, res) {
  let stmt = db.prepare("SELECT * from messages WHERE message_id = ?")
  let message = await new Promise((resolve, reject) => {
    stmt.get([req.params.id], (err, row) => ({id: row.rowid, title: row.title, message: row.message}), (err, n) => {
      stmt.finalize()
      if (err) {
        reject()
        return
      }
      let del = db.prepare("DELETE FROM messages WHERE message_id = ?")
      del.run([req.params.id], (err, n) => del.finalize())
      resolve(n)
    })
  })
  if (!message) {
    res.status(404)
    res.render("404", {page: "NOT FOUND"})
    return
  }
  res.header({"Cache-Control": "no-store"})
  res.render("messages/message", {
    page: message.title,
    message: message,
    timeout: DEFAULT_TIMEOUT
  })
})

module.exports = router
