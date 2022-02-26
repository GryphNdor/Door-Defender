import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {

  let users = []
  let armed = false
  let whoArmed = []

  if (res.socket.server.io) {
    console.log("socket is running")
  }
  else {
    console.log("initializing socket")
    const io = new Server(res.socket.server)
    res.socket.server.io = io
    io.on('connection', (socket) => {

      const id = socket.id

      if (!users.includes(id)) {
        users.push(id)
        socket.emit('updateId', id)
        socket.emit('armedSystem', armed)
        io.emit('getDoorLog', whoArmed)
        io.emit('getUsers', users)
      }
      socket.on('armSystem', () => {
        let date = new Date()
        whoArmed.push({ id: socket.id, armed: armed, time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
        armed = !armed
        io.emit('getDoorLog', whoArmed)
        io.emit('armedSystem', armed)
      })
      socket.on('disconnect', () => {
        users = users.filter((items) => items !== socket.id)
        io.emit('getUsers', users)
      })
    })
  }
  res.end()

}

export default SocketHandler