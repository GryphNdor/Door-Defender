import React from 'react'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'

export default function Layout({ children }) {

  const { user } = useUser();


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
          {!user && (
            <Link href="/api/auth/login">
              <a>Login</a>
            </Link>
          )}
          {user && (
            <>
              <img src={user.picture} alt={user.name} />
              <Link href="/api/auth/logout">
                <a>Logout</a>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </div >
  )
}