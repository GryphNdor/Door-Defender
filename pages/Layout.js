import React from 'react'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import Image from 'next/image'

export default function Layout({ children }) {
  return (
    <div>
      <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>

          <Image width={50} height={50} src="/logo.svg" />
          <Typography varient="h1" component="div" style={{ fontWeight: 700 }} sx={{ flexGrow: 1 }}>

            Door Defender
          </Typography>

          <Typography varient="h1" component="div" style={{ fontWeight: 500, paddingLeft: 1000 }} sx={{ flexGrow: 1 }}>
            Our Vision
          </Typography>

          <Typography varient="h1" component="div" style={{ fontWeight: 500 }} sx={{ flexGrow: 1 }}>
            Our Product
          </Typography>


        </Toolbar>
      </AppBar>
      {children}
    </div >
  )
}