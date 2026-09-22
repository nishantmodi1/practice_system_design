const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')


const app = express()
app.use(cors())

const server = http.createServer(app)
const io = socketIo(server, {
  cors: { origin: '*' }
})

app.get('/', (req, res) => {
  res.send('Websocket server running')
})

io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`)

  // Listen for 'chat message'
  socket.on('chat message', (msg) => {
    console.log(`${socket.id}: ${msg.text}`)

    // emit to everyone
    io.emit('chat message', {
      userId: socket.id,
      text:msg.text,
      time: new Date().toLocaleTimeString()
    })
  })

  // emit only to sender
  // socket.emit()

  // Listen for typing indicators
  socket.on('typing', (isTyping) => {
    // emit to everyone except sender
    socket.broadcast.emit('user typing', {
      userId: socket.id,
      isTyping: isTyping
    })
  })

  //disconnect
  socket.on('disconnect', () => {
    console.log('socket disconnected')
  })
})

const PORT = 5555
server.listen(PORT, () => {
  console.log(`server running on the port: ${PORT} `)
})