import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {

  let users = []
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
        socket.emit('armedSystem', armed)
        io.emit('getUsers', users)
      }
      socket.on('armSystem', () => {
        armed = !armed
        io.emit('armedSystem', armed)
      })
      socket.on('disconnect', () => {
        console.log(socket.id)
        users = users.filter((items) => items !== socket.id)
        io.emit('getUsers', users)
      })
    })
  }
  res.end()
}

export default SocketHandler