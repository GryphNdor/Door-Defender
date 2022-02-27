import React from 'react'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import Image from 'next/image'

export default function Layout({ children }) {
  return (
    <div>
      <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>

          <Image width={50} height={50} src="/logo.svg" />
          <Typography varient="h1" component="div" style={{ fontWeight: 700 }} sx={{ flexGrow: 1, mr: 2 }}>

            Door Defender
          </Typography>

          <Typography sx={{ mr: 2 }}>
            Our Vision
          </Typography>

          <Typography sx={{ mr: 2 }}>
            Our Product
          </Typography>

        </Toolbar>
      </AppBar>
      {children}
    </div >
  )
}