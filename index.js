let express = require('express')
let logger = require('morgan')
let cookieparser = require('cookie-parser')

let app = express()

// middelweres
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logger('dev'))

app.use(cookieparser())
app.use((req, res, next) => {
  res.cookie('username', 'abc')
  next()
})

// routes
app.get('/', (req, res) => {
  res.send('<h2>Welcome to express</h2>')
})

app.get('/about', (req, res) => {
  res.send('My name is qwerty')
})

app.post('/form', (req, res) => {
  res.json(req.body)
})

app.post('/json', (req, res) => {
  res.json(req.body)
})

app.get('/users/:username', (req, res) => {
  let username = req.params.username
  res.send(`<h2>${username}</h2>`)
})

// error middelware 404
app.use((req, res, next) => {
  res.send('404  page note found')
})
// client error
app.use((err, req, res, next) => {
  res.send(err)
})

app.listen(3000, () => {
  console.log('server listing port 3000')
})
