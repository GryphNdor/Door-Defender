import { Server } from 'Socket.IO'
import { SerialPort } from 'serialport'

const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
  delimiter: '\r\n'
});

var port = new SerialPort('/dev/cu.usbserial-14110', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

port.pipe(parser);


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
      socket.on('create', (room) => {
        socket.join(room)
        if (!users.includes(id)) {
          users.push(id)
          socket.emit('updateId', id)
          socket.emit('armedSystem', armed)
          io.to(room).emit('getDoorLog', whoArmed)
          io.to(room).emit('getUsers', users)
        }
        socket.on('armSystem', () => {
          let date = new Date()
          whoArmed.push({ id: socket.id, armed: armed, time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
          armed = !armed
          io.to(room).emit('getDoorLog', whoArmed)
          io.to(room).emit('armedSystem', armed)
        })
        socket.on('disconnect', () => {
          users = users.filter((items) => items !== socket.id)
          io.to(room).emit('getUsers', users)
        })

        parser.on('data', function (data) {
          io.to(room).emit('updateDoor', { data: data })
        });
      })
    })
  }
  res.end()

}

export default SocketHandler