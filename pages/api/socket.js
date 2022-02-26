import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {

  const users = []
  let armed = false

  if (res.socket.server.io) {
    console.log("socket is running")
  }
  else {
    console.log("initializing socket")
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', (socket) => {
      if (!users.includes(socket.id)) {
        users.push(socket.id)
        socket.emit('updateId', socket.id)
      }
      socket.on('armSystem', () => {
        armed = !armed
        io.emit('armedSystem', armed)
      })
    })
  }
  res.end()
}

export default SocketHandler