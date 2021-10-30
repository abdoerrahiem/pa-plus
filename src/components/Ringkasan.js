import { Typography } from '@material-ui/core'
import React from 'react'
import convert from '../utils/convert'

const jaminan = [
  'Biaya Perawatan Medis',
  'Cacat Permanen',
  'Santunan',
  'Konsultasi Medis Online Support by Good Doctor',
]

export default function Ringkasan({ planbiaya, tanggalAwal, tanggalAkhir }) {
  const date = tanggalAwal.getDate()
  const month = tanggalAwal.getMonth()
  const year = tanggalAwal.getFullYear()

  return (
    <div className='ringkasan'>
      <Typography>Ringkasan</Typography>
      <div>
        <div className='total-pembayaran'>
          <Typography>Total Pembayaran</Typography>
          <Typography align='center'>Rp {convert(planbiaya.total_payable)},-</Typography>
        </div>
        <div className='nilai-premi'>
          <Typography>Nilai Premi</Typography>
          <Typography>Rp {convert(planbiaya.total_payable)},-</Typography>
        </div>
        <div className='nilai-pertanggungan'>
          <Typography>Nilai Pertanggungan</Typography>
          <div className='nilai-pertanggungan-content'>
            <div>
              <i className='fas fa-circle' />
              <Typography>Kecelakaan Diri</Typography>
            </div>
            <Typography>Rp 25.000.000,-</Typography>
          </div>
          <div className='nilai-pertanggungan-content'>
            <div>
              <i className='fas fa-circle' />
              <Typography>Biaya Medis</Typography>
            </div>
            <Typography>Rp 2.500.000,-</Typography>
          </div>
          <div className='nilai-pertanggungan-content'>
            <div>
              <i className='fas fa-circle' />
              <Typography>Santunan Harian Rumah Sakit</Typography>
            </div>
            <Typography>Rp 3.500.000,-</Typography>
          </div>
        </div>
        <div className='jaminan'>
          <Typography>Jaminan</Typography>
          {jaminan.map((content) => (
            <div className='jaminan-content' key={content}>
              <img src={require('./assets/check_icon.png')} alt='' />
              <Typography>{content}</Typography>
            </div>
          ))}
        </div>
        <div className='periode-asuransi'>
          <Typography>Periode Asuransi</Typography>
          <div>
            <div className='tanggal-mulai'>
              <Typography>Tanggal Mulai :</Typography>
              <Typography>{`${date}/${month + 1}/${year}`}</Typography>
            </div>
            <div className='tanggal-akhir'>
              <Typography>Tanggal Akhir :</Typography>
              <Typography>{tanggalAkhir}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
