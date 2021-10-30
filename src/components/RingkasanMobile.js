import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import convert from '../utils/convert'

const jaminan = [
  'Biaya Perawatan Medis',
  'Cacat Permanen',
  'Santunan',
  'Konsultasi Medis Online Support by Good Doctor',
]

const useStyles = makeStyles({
  accordion: {},
  accordionTitle: {
    color: '#fff',
    fontSize: '16px',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  benefitPlusTitle: {
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
  accordionDetails: {
    backgroundImage: `url(${require('./assets/banner-02.png')})`,
    backgroundSize: 'cover',
  },
  accordionSummary: {
    marginBottom: '5px',
    backgroundColor: '#ffc20f',
  },
})

export default function RingkasanMobile({
  planbiaya,
  tanggalAwal,
  tanggalAkhir,
}) {
  const classes = useStyles()

  const date = tanggalAwal.getDate()
  const month = tanggalAwal.getMonth()
  const year = tanggalAwal.getFullYear()

  return (
    <div className='ringkasan-mobile'>
      <Accordion elevation={0} square>
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.accordionSummary}
        >
          <Typography variant='h6' className={classes.accordionTitle}>
            Ringkasan
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div className='ringkasan'>
            <div>
              <div className='total-pembayaran'>
                <Typography>Total Pembayaran</Typography>
                <Typography>Rp {convert(planbiaya.total_payable)},-</Typography>
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
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
