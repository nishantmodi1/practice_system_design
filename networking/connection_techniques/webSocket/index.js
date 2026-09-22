const express = require('express')
const http = require('http')
const { createServer } = require('http');
// const {createServer } = require('node:http');
// const path = require('path')
const { join } = require('node:path')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  console.log('connection established')

  socket.on('chat message', (msg) => {
    console.log('recieved message', msg)
    io.emit('chat message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

app.listen(5000, () => {
  console.log('Example app listening on port 5000!')
})