import React from 'react'
import { Icon, Typography, colors } from '@material-ui/core'

const Alert = ({ success, error }) => {
  const { green, red } = colors

  return (
    <div className='alert'>
      <Icon
        fontSize='large'
        style={{
          marginRight: '5px',
          color: success ? green[500] : error ? red[500] : null,
        }}
      >
        {success ? 'check_circle' : error ? 'error' : null}
      </Icon>
      <Typography variant='h6'>
        {success
          ? 'Transaksi berhasil'
          : error
          ? 'Transaksi tidak berhasil!'
          : null}
      </Typography>
    </div>
  )
}

export default Alert
