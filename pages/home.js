import { Grid, Button } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import Link from 'next/link'

export default function home() {
  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-evenly" style={{ backgroundColor: '#384270', color: 'white', height: '100vh' }}>
        <Grid item>
          <h1 style={{ fontSize: '6em', width: 800 }}>
            Keeping your room safe and secure
          </h1>
        </Grid>
        <Grid item>
          <Image width={600} height={600} src="/image 1.svg" />
        </Grid>
      </Grid>
      {/* lolol it works bruh */}
      <section className={styles.section}>
        <div id="container" style={{
          marginTop: 100, display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em', width: 592, color: 'white', padding: 0, margin: 0 }}>
              Our Vision
            </h1>
            <p style={{ fontSize: '2em', maxWidth: 600, color: 'white', fontWeight: 300, padding: 0 }}>
              The Door Defender was designed as a defense mechanism against home breakins.
              In the US, over 1.65 million home breakins are recorded every year.
              Our vision was to create a product that is easy to set up, cheap, effective,
              and does not invade on other people’s privacy.
            </p>
          </div>
              <Image src="/vision 1 1.jpg" className={styles.rounded} width={500} height={400} objectFit="cover" />
        
            
        </div>
      </section>
      <section className={styles.section2}>
        <div>
          <h1 style={{ fontSize: '4em', width: 592, color: 'black' }}>
            Our product
          </h1>
          <h3 style={{ fontSize: '2em', width: 735, color: 'black', fontWeight: 300 }}>
            The Door Defender is a lighweight, resilient box that will be attached to the back of the door
            that will be attached using strong adhesive. The Door Defender will detect the door opening and will contact
            you using an app. The app is also allows the user to disarm and arm the Door Defender and will also shows the users
            on the app.
          </h3>
          <Button variant="contained">
            <Link href="/">
              View Product
            </Link>
          </Button>
        </div>
            <Image width={600} height={600} className={styles.rounded} src="/20220226_174333.jpg" />
      </section >
    </div >
  )
}