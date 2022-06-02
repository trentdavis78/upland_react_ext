import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import UALProviderComponent from '../background/background'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { withUAL } from 'ual-reactjs-renderer'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import BottomAppBar from './components/BottomAppBar'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import AvatarChip from './components/AvatarChip'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import BackdropComponent from './components/BackdropComponent'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
 
        body {
          margin: 0;
          padding: 0;         
                 
        }
       
      `,
    },
  },
})

const App = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const {
    ual: { activeUser, activeAuthenticator, logout, loading },
  } = props

  const [backdropOpen, setBackdropOpen] = React.useState(false)
  const handleBackdropClose = () => {
    setBackdropOpen(false)
  }
  const handleBackdropToggle = () => {
    setBackdropOpen(!backdropOpen)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [loading])

  const openOptions = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0])
      chrome.tabs.remove(tabs[0].id)
    })
    chrome.runtime.openOptionsPage()
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

  return (
    <div
      style={{
        overflow: 'hidden',
        // width: '357px',
        // height: '600px',
        height: '100vh',
        backgroundImage: 'url("assets/popup_background.svg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',

        margin: 0,
        padding: 0,
      }}
    >
      {!isLoading ? (
        <>
          {!!activeUser && !!activeAuthenticator ? (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={4}>
                    <AvatarChip username={activeUser.accountName} />
                  </Grid>
                </Grid>
              </Box>
              {/* <button onClick={logout}>Logout</button> */}
              <BottomAppBar logInOut={logout} icon={<LogoutIcon />} />
            </>
          ) : (
            <BackdropComponent
              open={backdropOpen}
              defaultOpen={true}
              setOpen={setBackdropOpen}
              handleClose={handleBackdropClose}
              handleToggle={handleBackdropToggle}
            >
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
              >
                <h1>LOGIN</h1>
                <ArrowDownwardIcon sx={{ fontSize: '4rem', color: 'white' }} />
              </Grid>
              <BottomAppBar logInOut={openOptions} icon={<LoginIcon />} />
            </BackdropComponent>
          )}
        </>
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <BackdropComponent
            open={backdropOpen}
            defaultOpen={true}
            setOpen={setBackdropOpen}
            handleClose={handleBackdropClose}
            handleToggle={handleBackdropToggle}
          >
            <CircularProgress color="primary" />
          </BackdropComponent>
        </Grid>
      )}
    </div>
  )
}
const MyUALConsumer = withUAL(App)

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

// const root = document.createElement('div')
// document.body.appendChild(root)
// ReactDOM.createRoot(<MyApp Component={App} />, root)
