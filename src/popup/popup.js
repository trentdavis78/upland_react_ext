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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [loading])

  const openOptions = () => {
    chrome.runtime.openOptionsPage()
  }

  return (
    <div style={{ overflow: 'hidden', width: '357px', height: '600px' }}>
      {!isLoading ? (
        <>
          {!!activeUser && !!activeAuthenticator ? (
            <>
              <h1>Hello {activeUser.accountName}</h1>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button onClick={() => openOptions()}>Open Login Option</button>
          )}
        </>
      ) : (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
          <CircularProgress color="primary" />
        </Stack>
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
