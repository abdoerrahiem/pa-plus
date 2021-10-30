import React from 'react'
import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import convert from '../utils/convert'

const TransactionFailed = ({ data }) => {
  return (
    <div className='transaction' style={{fontFamily: "Arial" }}>
      <Typography variant='h6'>Ringkasan Transaksi</Typography>
      <p style={{color:"#FA2E03"}}>Silahkan lakukan pembayaran sebelum jangka waktu pembayaran Anda habis, cek email untuk informasi cara pembayaran Asuransi anda.</p>

      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
            <TableRow>
              <TableCell width="40%" align="left">Transaksi ID</TableCell>
              <TableCell width="10%" align="center"><strong> : </strong></TableCell>
              <TableCell width="50%"align="right"><strong>N/A</strong></TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Nomor Invoice</TableCell>
              <TableCell align="center"><strong> : </strong></TableCell>
              <TableCell align="right"><strong>N/A</strong></TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Waktu Transaksi</TableCell>
              <TableCell align="center"><strong> : </strong></TableCell>
              <TableCell align="right"><strong>N/A</strong></TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="left">Jenis Pembayaran</TableCell>
              <TableCell align="center"><strong> : </strong></TableCell>
              <TableCell align="right"><strong>N/A</strong></TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default TransactionFailed
