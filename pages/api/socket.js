import { Server } from 'socket.io'
import SerialPort from 'serialport'

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
  let armed = {}
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
        armed[room] = false
        socket.on('setNick', (nick) => {
          socket.nickname = nick
          if (!users.includes(nick)) {
            users.push({ id: id, name: socket.nickname, room: room })
            console.log(users)
            socket.emit('updateId', socket.nickname)
            socket.emit('armedSystem', armed[room])
            io.to(room).emit('getDoorLog', whoArmed.filter((items) => items.room === room))
            io.to(room).emit('getUsers', users.filter((items) => items.room === room))
          }

        })
        socket.on('clear', () => {
          whoArmed = whoArmed.filter((items) => items.room !== room)
          io.to(room).emit('getDoorLog', [])
        })
        socket.on('armSystem', () => {
          let date = new Date()
          whoArmed.push({ id: socket.nickname, room: room, armed: armed[room], time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
          armed[room] = !armed[room]
          console.log(armed)
          io.to(room).emit('getDoorLog', whoArmed.filter((items) => items.room === room))
          io.to(room).emit('armedSystem', armed[room])
        })
        socket.on('disconnect', () => {
          users = users.filter((items) => items.room === room && items.id !== socket.id)
          io.to(room).emit('getUsers', users)
        })

        parser.on('data', function (data) {
          let date = new Date()
          whoArmed.push({ id: 'Security Door', room: room, armed: armed[room], entry: data, time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
          io.to(room).emit('getDoorLog', whoArmed.filter((items) => items.room === room))
          console.log(armed[room])
          if (armed[room] === true) {
            console.log("here")
            io.to(room).emit('alertIntruder', armed[room])
          }
          console.log(data);
        });
      })
    })
  }
  res.end()

}

export default SocketHandler