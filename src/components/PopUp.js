import React from 'react'
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import PopUpImage from '../assets/popup-image.jpg'
import './stepForm/style.css'

const PopUp = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
    >
      <div className='pop-up'>
        <div>
          <img src={PopUpImage} alt='' />
          <IconButton onClick={handleClose} className='pop-up__button'>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </Modal>
  )
}

export default PopUp
