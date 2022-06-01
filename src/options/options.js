import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import UALProviderComponent from '../background/background'
import { withUAL } from 'ual-reactjs-renderer'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { red, green, blue } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      html {
        font-size: 62.5%; /* 62.5% of 16px = 10px */
      }   
        
        body {
          margin: 0;
          padding: 0;         
                 
        }       
      `,
    },
  },
})

const ResponsivePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    backgroundColor: '#001760', // blue
    width: '66vw',
    padding: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    backgroundColor: blue[500],
    width: '50vw',
    padding: '3rem',
  },
  [theme.breakpoints.up('lg')]: {
    backgroundColor: '#3e007f', // purple
    width: '33vw',
    padding: '4rem',
  },
}))

const OptionsPage = (props) => {
  const {
    ual: { activeUser, activeAuthenticator, logout, loading },
  } = props

  return (
    <div
      style={{
        backgroundImage: 'url("assets/background.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={'100vh'}
      >
        <ResponsivePaper>
          <Paper elevation={3}>
            {!!activeUser && !!activeAuthenticator ? (
              <Button
                onClick={() => logout()}
                variant="contained"
                color="secondary"
                startIcon={<Avatar src={'assets/wax.svg'} />}
                fullWidth
              >
                <Typography variant="h5">
                  Logout of {activeUser.accountName}
                </Typography>
              </Button>
            ) : (
              <Button
                onClick={() => props.ual.showModal()}
                variant="contained"
                color="secondary"
                startIcon={<Avatar src={'assets/wax.svg'} />}
                fullWidth
              >
                <Typography variant="h5">Login with WAX</Typography>
              </Button>
            )}
          </Paper>
        </ResponsivePaper>
      </Box>
    </div>
  )
}

const MyUALConsumer = withUAL(OptionsPage)

const newDiv = document.createElement('div')
newDiv.id = 'root'
document.body.appendChild(newDiv)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <React.StrictMode>
      <UALProviderComponent>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyUALConsumer />
        </ThemeProvider>
      </UALProviderComponent>
    </React.StrictMode>
  </>
)
