import React from 'react'
import { Modal } from '@material-ui/core'

const ModalCom = ({ children, showModal, handleClose }) => {
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className='paket-modal'>
        <div>{children}</div>
      </div>
    </Modal>
  )
}

export default ModalCom
