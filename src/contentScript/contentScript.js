import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Modal from './components/Modal'

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.message)
  if (request.message === 'PROPERTY_MODEL') {
    sendResponse(`${request.message} was received`)
    const alerts = document.getElementsByClassName('alert')
    const arr = Array.from(alerts)

    arr.map((el) => {
      el.childNodes.forEach((node) => {
        if (node.classList.contains('WithChildren')) {
          const newDiv = document.createElement('div')
          newDiv.id = 'react-root'
          node.firstChild.firstChild.setAttribute('style', 'min-height: 200px')
          const divAttrbs = getAllAttribs(node.firstChild.firstChild.firstChild)
          const buttonAttribs = getAllAttribs(
            node.firstChild.firstChild.firstChild.firstChild
          )
          const SubDivideAttribs = {
            ...buttonAttribs,
            alt: 'Sub-Divide',
          }
          const FurnishBtnAttr = {
            ...buttonAttribs,
            alt: 'Furnish',
          }

          newDiv.setAttribute('style', 'min-height: 104px')
          node.firstChild.firstChild.prepend(newDiv)
          const root = ReactDOM.createRoot(
            document.getElementById('react-root')
          )
          root.render(
            <>
              <div
                key={Math.random()}
                height={divAttrbs.height}
                width={divAttrbs.width}
                className={divAttrbs.class}
                style={{ position: 'relative', top: 10 }}
              >
                <NewButton buttonAttrbs={SubDivideAttribs} />
              </div>
              <div
                key={Math.random()}
                height={divAttrbs.height}
                width={divAttrbs.width}
                className={divAttrbs.class}
                style={{ marginTop: '20px' }}
              >
                <NewButton buttonAttrbs={FurnishBtnAttr} />
              </div>
            </>
          )
        }
      })
    })
  }
  if (request.message === 'API_PROPERTIES') {
    sendResponse(`${request.message} was received`)
  }
})

const getAllAttribs = (element) => {
  const attrs = element.getAttributeNames().reduce((acc, name) => {
    return { ...acc, [name]: element.getAttribute(name) }
  }, {})

  return attrs
}

const NewButton = ({ buttonAttrbs }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const FurnishStyles = {
    background: 'rgb(99,8,168)',
    background:
      'linear-gradient(0deg, rgba(99,8,168,1) 17.17%, rgba(185,15,203,1) 76.68%)',
  }
  const SubDivideStyles = {
    background: 'rgb(27,15,203)',
    background:
      'linear-gradient(0deg, rgba(27,15,203,1) 17.17%, rgba(10,115,249,1) 76.68%)',
  }

  const handleOnClick = (e) => {
    alert('FUCK YOURSELF')
  }

  return (
    <>
      <button
        style={buttonAttrbs.alt == 'Furnish' ? FurnishStyles : SubDivideStyles}
        className={buttonAttrbs.class}
        type="button"
        alt={buttonAttrbs.alt}
        onClick={handleClickOpen}
      >
        {buttonAttrbs.alt}
      </button>
      <Modal open={open} handleClose={handleClose} />
    </>
  )
}
