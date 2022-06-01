chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.message)
  if (request.message === 'PROPERTY_MODEL') {
    sendResponse(`${request.message} was received`)
  }
  if (request.message === 'API_PROPERTIES') {
    sendResponse(`${request.message} was received`)
  }
})
