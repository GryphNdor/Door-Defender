import { Grid, Button, useMediaQuery } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import styles from '../styles/Index.module.css'
import Link from 'next/link'

export default function home() {
  const small = useMediaQuery('(max-width:600px)')

  return (
    <div>
      <Grid container alignItems="center" flexDirection={small ? "column" : "row"} justifyContent="space-evenly" style={{ backgroundColor: '#384270', color: 'white', height: '100vh' }}>
        <Grid item>
          <h1 style={{ fontSize: small ? '3em' : '6em', width: small ? 400 : 800 }}>
            Keeping your room safe and secure
          </h1>
        </Grid>
        <Grid item>
          <Image width={500} height={500} src="/image 1.svg" />
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
          <div>
            <Grid item>
              <h4>Help</h4>
            </Grid>
          </div>
        </div>
      </section>
      <section className={styles.section2}>
        <div>
          <h1 style={{ fontSize: '4em', width: 592, color: 'black' }}>
            Our product
          </h1>
          <h3 style={{ fontSize: '2em', width: 735, color: 'black', fontWeight: 300 }}>
            Adipiscing tincidunt eu varius ut facilisis
            Sed nec donec in senectus Massa pretium pretium phasellus lacus
            Adipiscing gravida dui rhoncus ac eget elementum a Urna convallis vivamus morbi vulputate lobortis
          </h3>
          <Button variant="contained">
            <Link href="/doorguard">
              View Product
            </Link>
          </Button>
        </div>
        <div>
          <Image width={500} height={500} src="/door defender2 1.svg" />
        </div>
      </section >
    </div >
  )
}
