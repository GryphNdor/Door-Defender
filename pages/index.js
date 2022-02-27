import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import io from 'Socket.IO-client'

import { authToken, accountSid } from 'twiliothings.js'
const client = require('twilio')(process.env.authToken, process.env.accountSid)

// function sendAlertTextMessage(number) {
//   client.messages.create({
//     body: "{TESTING} Device has been armed",
//     to: number,
//     from: '+15715543828'
//   }).then(message => console.log(message))
//     .catch(error => console.log(error))
// }

let socket

export default function Home() {
  useEffect(() => getSocket(), [])
  const [id, setId] = useState()
  const [armed, setArmed] = useState()
  const [number, setNumber] = useState()
  const [name, setName] = useState()
  const [users, setUsers] = useState([])
  const [doorlog, setDoorLog] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  const armSystem = () => {
    // sendAlertTextMessage('+15713319730')
    socket.emit('armSystem')
  }

  const getSocket = async () => {
    await fetch('/api/socket')
    socket = io()
    socket.on('connect', () => {
      console.log("connected!")
    })
    // console.log(number)
    // socket.emit("create", number)
    socket.on('disconnect', () => {
      console.log(socket.id)
    })
    socket.on('updateId', (msg) => {
      setId(msg)
    })
    socket.on('armedSystem', (msg) => {
      setArmed(msg)
    })
    socket.on('getUsers', (msg) => {
      setUsers(msg)
    })
    socket.on('getDoorLog', (msg) => {
      // console.log(msg)
      setDoorLog(msg)
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {
          loggedIn ?
            <>
              <h1>{id}</h1>
              <button style={{ backgroundColor: `${armed ? 'hsl(340deg 100% 32%)' : 'green'}` }} onClick={() => armSystem()} className={styles.pushable}>
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span style={{ backgroundColor: `${armed ? 'red' : 'hsl(119deg 100% 32%)'}` }} className={styles.front}>
                  {armed ? 'Arm System' : 'Disarm System'}
                </span>
              </button>

              <button style={{ backgroundColor: `hsla(176, 38%, 70%)`, margin: 25 }} className={styles.pushable}>
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span style={{ backgroundColor: 'lightblue' }} className={styles.front}>
                  Send Ping
                </span>
              </button>

              <div className={styles.grid} style={{ marginTop: 100 }}>
                <button style={{
                  position: 'relative', left: 80, top: -120, borderRadius: 100, border: 'none', color: 'blue', padding: 5,
                }}>Clear Logs</button>
                <div className={styles.card} style={{ overflowY: 'scroll' }}>
                  <h4>Door Log</h4>
                  <ul style={{ padding: 0, listStyleType: 'none' }}>
                    {
                      doorlog?.map((test, i) => (
                        <li key={i} style={{ marginBottom: 10 }}>
                          System <span>{test.armed ? <b>armed</b> : <b>disarmed</b>}</span> by {test.id} ({test.time})
                        </li>
                      ))
                    }
                  </ul>
                </div>

                <div className={styles.card} >
                  <h4>Users Online</h4>
                  <ul style={{ padding: 0, listStyleType: 'none' }}>
                    {users.map((test, i) => <li key={i}>{test}</li>)}
                  </ul>
                </div>
              </div>
            </>
            :
            <div>
              <form id="form">
                <h3>Name</h3>
                <input style={{ padding: 10 }} type="text" />
                <h3>Room #</h3>
                <input style={{ padding: 10, marginBottom: 40 }} onChange={(e) => setNumber(e.target.value)} type="number" />
              </form>
              <button style={{ backgroundColor: `hsla(248, 33%, 59%)` }} onClick={() => setLoggedIn(!loggedIn)} className={styles.pushable}>
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span style={{ backgroundColor: 'hsla(248, 33%, 59%)' }} className={styles.front}>
                  Login
                </span>
              </button>
            </div>
        }
      </main >
    </div >
  )
}
