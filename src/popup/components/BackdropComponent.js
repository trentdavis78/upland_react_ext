import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

export default function BackdropComponent({
  children,
  open,
  handleClose,
  defaultOpen,
}) {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: 9999 }}
        open={defaultOpen == true ? true : open}
        onClick={handleClose}
      >
        {children}
      </Backdrop>
    </>
  )
}
