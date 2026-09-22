const express = require('express')

const app = express()

const { join } = require('node:path')

app.get('/sse', (req, res) => {
  // setup sse logic
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  res.write('data: Welcome to the Server sent events \n\n')

  const intervalId = setInterval(() => {
    res.write(`data: server time ${new Date().toLocaleString()} \n\n`)
  }, 5000)

  req.on('close', () => {
    clearInterval(intervalId)
    res.end()
  })
})

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

const port = 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})