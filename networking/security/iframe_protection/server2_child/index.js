const express = require('express')

const PORT = 5011
const app = express()

app.use(express.static('public'))

// define your routes
app.get('/iframe-example1', (req, res) => {
  res.sendFile(__dirname + '/public/iframewebiste1.html')
})

app.get('/example2', (req, res) => {
  res.sendFile(__dirname + '/public/iframewebsite2.html')
})

app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`)
})