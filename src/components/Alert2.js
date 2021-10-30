import React from 'react'
import { Icon, Typography, colors } from '@material-ui/core'

const Alert2 = ({ success, error }) => {
  const { green, red } = colors

  return (
    <div className='alert'>
      <Icon
        fontSize='large'
        style={{
          marginRight: '5px',
          color: '#C0392B',
        }}
      >
        error
      </Icon>
      <Typography variant='h6' style={{color:"#C0392B"}}>
         Transaksi tidak berhasil !
      </Typography>
    </div>
  )
}

export default Alert2
