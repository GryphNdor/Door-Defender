import React from 'react'
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'

export default function Layout({ children }) {
  const router = useRouter()

  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    router.push('/api/auth/logout')
  }

  return (
    <div>
      <AppBar style={{ backgroundColor: 'white', color: 'black' }}>
        <Toolbar>

          <Link href="/" style={{ cursor: 'pointer' }}>
            <Image width={50} height={50} src="/logo.svg" />
          </Link>
          <Typography variant="h5" component="div" style={{ fontWeight: 700 }} sx={{ flexGrow: 1, mr: 2 }}>
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
              <Avatar alt={user.name} sx={{ mr: 2 }} src={user.picture} onClick={handleClick} />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              {/* <Link href="/api/auth/logout">
                <a>Logout</a>
              </Link> */}
            </>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </div >
  )
}