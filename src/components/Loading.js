import React from 'react'
import { Modal } from '@material-ui/core'

const Modaloading = ({ children, showModal, handleClose }) => {
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className='loading-modal'>
        <div>{children}</div>
      </div>
    </Modal>
  )
}

export default Modaloading
