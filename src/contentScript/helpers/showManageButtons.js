import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Modal from '../components/Modal'
import { manageModal, manageButton } from './htmlFiles'
import { checkSubDivide } from '../../utils/api'
export const showManageButtons = (currOwner, currPropModelID) => {
  const myEOSID = sessionStorage.getItem('eos_id')

  if (currOwner === myEOSID) {
    const getAllAttribs = (element) => {
      const attrs = element.getAttributeNames().reduce((acc, name) => {
        return { ...acc, [name]: element.getAttribute(name) }
      }, {})

      return attrs
    }
    const NewButton = ({ buttonAttrbs }) => {
      const [open, setOpen] = useState(false)
      const [canBeDivided, setCanBeDivided] = useState(false)

      useEffect(() => {
        checkSubDivide(currPropModelID)
          .then((res) => {
            setCanBeDivided(res.matches)
            console.log(`CanbeDivided is set to ${canBeDivided}`)
          })
          .catch((err) => console.log(err.response))
      }, [])
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
        opacity: canBeDivided ? '1' : '0.2',
        cursor: canBeDivided ? 'pointer' : 'not-allowed',
      }

      const SubDivideStyles = {
        background: 'rgb(27,15,203)',
        background:
          'linear-gradient(0deg, rgba(27,15,203,1) 17.17%, rgba(10,115,249,1) 76.68%)',
        opacity: !canBeDivided ? '1' : '0.2',
        cursor: !canBeDivided ? 'pointer' : 'not-allowed',
      }

      return (
        <>
          <button
            style={
              buttonAttrbs.alt == 'Furnish' ? FurnishStyles : SubDivideStyles
            }
            className={buttonAttrbs.class}
            type="button"
            alt={buttonAttrbs.alt}
            onClick={handleClickOpen}
            disabled={
              buttonAttrbs.alt == 'Furnish' ? !canBeDivided : canBeDivided
            }
          >
            {buttonAttrbs.alt}
          </button>
          <Modal open={open} handleClose={handleClose} />
        </>
      )
    }

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
                disabled={myEOSID == currOwner}
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
  } else {
    const addManageModal = () => {
      const newDiv = document.createElement('div')
      newDiv.setAttribute('style', 'z-index: 9999; position: relative')
      newDiv.innerHTML = manageModal
      const target = document.querySelector('.hidden')
      // insert the element before target element
      target.parentNode.insertBefore(newDiv, target)
    }

    const closeFooter = document.getElementsByClassName(
      'close-footer collapsible '
    )

    const newDiv = document.createElement('div')
    newDiv.setAttribute('style', ' margin-left:35px')
    newDiv.addEventListener('click', function handleClick(event) {
      addManageModal()
    })
    newDiv.innerHTML = manageButton
    closeFooter[0].appendChild(newDiv)
  }
}
