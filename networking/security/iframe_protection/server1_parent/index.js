const express = require('express')

const PORT = 5010
const app = express()

app.use(express.static('public'))

// define your routes
app.get('/example1', (req, res) => {
  res.sendFile(__dirname + '/public/example1.html')
})

app.get('/example2', (req, res) => {
  res.sendFile(__dirname + '/public/example2.html')
})

app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`)
})