const express = require('express')

const PORT = 5000
const app = express()

//middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self';",
    "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com"
  )
  next()
})

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`)
})