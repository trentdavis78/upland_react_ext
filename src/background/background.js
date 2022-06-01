import { Wax } from '@eosdacio/ual-wax'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { Anchor } from 'ual-anchor'
import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import { WAX_CHAIN_ID, WAX_BASE_ENDPOINT_HOST } from '../utils/config_wax'

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
    chrome.tabs.sendMessage(req.tabId, { message: 'API_PROPERTIES' }, (res) => {
      if (!chrome.runtime.lastError) {
        console.log(res)
      } else {
        console.error(chrome.runtime.lastError)
      }
    })
  } else if (
    req.url.includes('business/property-model') &&
    !req.url.includes('finished')
  ) {
    console.log('You clicked prop management')
    chrome.tabs.sendMessage(req.tabId, { message: 'PROPERTY_MODEL' }, (res) => {
      if (!chrome.runtime.lastError) {
        console.log(res)
      } else {
        console.error(chrome.runtime.lastError)
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
