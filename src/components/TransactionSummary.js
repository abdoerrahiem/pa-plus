import React from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
} from '@material-ui/core'
import convert from '../utils/convert'

const TransactionSummary = ({ data }) => {
  return (
    <div className='transaction'>
      <Typography variant='h6'>Ringkasan Transaksi</Typography>
      <List component='nav' aria-label='mailbox folders'>
        <ListItem button>
          <ListItemText primary='Nomor Polis' /> 
          <ListItemSecondaryAction style={{ width: '50%' }}> 
            <ListItemText
              primary={data && data.care_policy_number ? data.care_policy_number : 'N/A'}
            /> 
          </ListItemSecondaryAction>
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary='Nomor Invoice' />
          <ListItemSecondaryAction style={{ width: '50%' }}>
            <ListItemText
              primary={data && data.order_id ? data.order_id : 'N/A'}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary='Waktu Transaksi' />
          <ListItemSecondaryAction style={{ width: '50%' }}>
            <ListItemText primary={data && data.transaction_time ? data.transaction_time : 'N/A'} />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary='Jumlah' style={{ width: '5%' }} />
          <ListItemSecondaryAction style={{ width: '50%' }}>
            <ListItemText
              primary={
                data && data.gross_amount ? `Rp. ${convert(data.gross_amount)}` : 'N/A'
              }
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary='Jenis Pembayaran' />
          <ListItemSecondaryAction style={{ width: '50%' }}>
            <ListItemText
              primary={
                data && data.payment_type ? data.payment_type : 'N/A'
              }
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary='Transaksi ID' />
          <ListItemSecondaryAction style={{ width: '50%' }}>
            <ListItemText
              primary={data && data.transaction_id ? data.transaction_id : 'N/A'}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <Divider light />
      </List>
    </div>
  )
}

export default TransactionSummary
