import { Wax } from '@eosdacio/ual-wax'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { Anchor } from 'ual-anchor'
import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import { WAX_CHAIN_ID, WAX_BASE_ENDPOINT_HOST } from '../utils/config_wax'
import {getUserFromApp} from '../utils/api'

import React from 'react'

function UALProviderComponent({ children }) {
  const appName = 'MetaForceComics.io'
  const chain = {
    chainId: WAX_CHAIN_ID,
    name: 'WAX',
    rpcEndpoints: [
      {
        protocol: 'https',
        host: WAX_BASE_ENDPOINT_HOST,
        port: 443,
      },
    ],
  }
  const getAuthenticators = () => {
    const anchor = new Anchor([chain], {
      appName,
    })
    const wax = new Wax([chain], {})

    return [anchor, wax]
  }
  const authenticators = getAuthenticators()

  return (
    <UALProvider
      chains={[chain]}
      authenticators={authenticators}
      appName={appName}
    >
      {children}
    </UALProvider>
  )
}
export default withUAL(UALProviderComponent)

function requestHandler(req) {
  console.log(req)
  if (
    req.url.includes('api/properties') &&
    !req.url.includes('mine/detailed')
  ) {
    console.log('you clicked on a property')
    chrome.tabs.sendMessage(
      req.tabId,
      { message: 'API_PROPERTIES', url: req.url },
      (res) => {
        if (!chrome.runtime.lastError) {
          console.log(res)
        }
      }
    )
  } else if (
    req.url.includes('business/property-model') &&
    !req.url.includes('finished')
  ) {
    console.log('You clicked prop management')
    chrome.tabs.sendMessage(req.tabId, { message: 'PROPERTY_MODEL' }, (res) => {
      if (!chrome.runtime.lastError) {
        console.log(res)
      }
    })
  } else {
    console.log('No matches')
  }
}
function setListeners() {
  chrome.webRequest.onCompleted.addListener(requestHandler, {
    urls: [
      'https://api.sandbox.upland.me/api/properties/*',
      'https://api.sandbox.upland.me/business/property-model/*',
    ],
  })
}
function removeListeners() {
  chrome.webRequest.onBeforeSendHeaders.removeListener(requestHandler)
  chrome.webRequest.onBeforeRequest.removeListener(requestHandler)
  chrome.webRequest.onCompleted.removeListener(requestHandler)
}

setListeners()

// keep service worker persistent

let lifeline

keepAlive()

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'keepAlive') {
    lifeline = port
    setTimeout(keepAliveForced, 295e3) // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced)
  }
})

function keepAliveForced() {
  lifeline?.disconnect()
  lifeline = null
  keepAlive()
}

async function keepAlive() {
  if (lifeline) return
  for (const tab of await chrome.tabs.query({ url: '*://*/*' })) {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => chrome.runtime.connect({ name: 'keepAlive' }),
        // `function` will become `func` in Chrome 93+
      })
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate)
      return
    } catch (e) {}
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate)
}

async function retryOnTabUpdate(tabId, info, tab) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    keepAlive()
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == 'SIGN_TX_SUBDIVIDE') {
    console.log('SUBDIVIDE')
    // getUserFromApp(request.options.eosId).then((res) => {
    //   console.log(res)
    // })
    sendResponse()
  }
})
