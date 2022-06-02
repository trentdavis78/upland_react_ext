import React, { useState, useEffect } from 'react'
import { fetchData } from '../utils/api'
import { showManageButtons } from './helpers/showManageButtons'

let currPropID
let currOwner
let currPropModelID
let currFullAddress
let currCityID
let currSparkHrs
const myID = sessionStorage.getItem('eos_id')
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'PROPERTY_MODEL') {
    switch (currCityID) {
      case 1:
        currFullAddress += ' , CA'
        break
      case 3:
        currFullAddress += ' , NY'
        break
      default:
        break
    }
    sendResponse(`${request.message} was received`)
    showManageButtons(currOwner, currPropModelID, currFullAddress, currSparkHrs)
  }

  if (request.message === 'API_PROPERTIES') {
    let n = request.url.lastIndexOf('/')
    let result = request.url.substring(n + 1)
    result = result.toString()

    if (result !== currPropID) {
      currPropID = result
      fetchData(request.url).then((data) => {
        console.log(` your property data: ${JSON.stringify(data)}`)
        currOwner = data?.owner
        currPropModelID = data?.building?.propModelID
        currFullAddress = data?.full_address + ', ' + data?.city?.name
        currCityID = data?.city?.id
        currSparkHrs = data?.building?.details?.maxStackedSparks

        if (myID !== currOwner) {
          showManageButtons(currOwner, currPropModelID)
        }
      })
    } else {
      console.log('The same prop_id')
    }

    sendResponse(`${request.message} was received`)
  }
})
