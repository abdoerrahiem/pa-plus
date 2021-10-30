import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  slogan: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  },
  sloganTitle: {
    fontFamily: 'MetaPlus',
    fontSize: '28px',
    marginTop: '3px',
  },
  sloganSubtitle: {
    fontSize: '20px',
  },
})

export default function Slogan() {
  const classes = useStyles()

  return (
    <div className={classes.slogan}>
      <img src={require('./assets/icon-good-doctor.png')} alt='EtiQa Logo' />
      <Typography variant='h5' align='center' className={classes.sloganTitle}>
        <strong>Asuransi Kecelakaan Diri PLUS</strong>
      </Typography>
      <Typography
        variant='subtitle1'
        align='center'
        className={classes.sloganSubtitle}
      >
        Manfaat lengkap atas resiko kecelakaan, PLUS layanan kesehatan
      </Typography>
    </div>
  )
}
