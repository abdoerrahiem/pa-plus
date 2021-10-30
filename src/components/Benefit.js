import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import MinimizeIcon from '@material-ui/icons/Minimize'

import { benefits } from './data/benefits'

const useStyles = makeStyles({
  accordion: {
    border: '1px solid #fff',
    borderRadius: 3,
    marginBottom: 5,
  },
  accordionTitle: {
    color: '#000',
    fontSize: '16px',
    fontFamily: 'Roboto',
  },
  benefitPlusTitle: {
    lineHeight: 1.5,
    flex: 1,
    marginRight: 10,
  },
  benefitPlusValue: {
    lineHeight: 1.5,
    fontWeight: 'bold',
    flex: 1,
  },
  accordionDetails: {
    flexDirection: 'column',
    padding: '30px',
    backgroundImage: `url(${require('./assets/banner-mobile-01.png')})`,
    backgroundSize: 'cover',
  },
  accordionSummary: {
    marginBottom: '5px',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 35,
    borderRadius: 35,
  },
  note: {
    fontStyle: 'italic',
    marginTop: 20,
  },
})

export default function Benefit() {
  const classes = useStyles()

  const [active, setActive] = useState([])

  const handleClick = (benefitId) => {
    if (active.includes(benefitId)) {
      setActive(active.filter((c) => c !== benefitId))
    } else {
      setActive((old) => [...old, benefitId])
    }
  }

  return (
    <div>
      {benefits.map((benefit) => (
        <Accordion
          className={classes.accordion}
          elevation={0}
          square
          key={benefit.id}
          onClick={() => handleClick(benefit.id)}
        >
          <AccordionSummary
            expandIcon={
              active.includes(benefit.id) ? (
                <view className={classes.button}>
                  <MinimizeIcon />
                </view>
              ) : (
                <view className={classes.button}>
                  <AddIcon style={{ marginTop: 5 }} />
                </view>
              )
            }
            aria-controls='panel1a-content'
            id='panel1a-header'
            className={classes.accordionSummary}
          >
            <Typography variant='h6' className={classes.accordionTitle}>
              {benefit.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <div className='benefit-item'>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusTitle}
              >
                Kecelakaan Diri
              </Typography>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusValue}
              >
                {benefit.kecelakaanDiri}
              </Typography>
            </div>
            <div className='benefit-item'>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusTitle}
              >
                Rawat Medis Karena Kecelakaan
              </Typography>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusValue}
              >
                {benefit.rawatMedis}
              </Typography>
            </div>
            {benefit.santunan && (
              <div className='benefit-item'>
                <Typography
                  variant='subtitle2'
                  className={classes.benefitPlusTitle}
                >
                  Santunan Harian Rumah Sakit
                </Typography>
                <Typography
                  variant='subtitle2'
                  className={classes.benefitPlusValue}
                >
                  {benefit.santunan}
                </Typography>
              </div>
            )}
            <div className='benefit-item'>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusTitle}
              >
                Telekonsultasi medis Via Good Doctor
              </Typography>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusValue}
              >
                {benefit.konsultasi}
              </Typography>
            </div>
            <div className='benefit-item'>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusTitle}
              >
                Akses Sesi Webinar
              </Typography>
              <Typography
                variant='subtitle2'
                className={classes.benefitPlusValue}
              >
                {benefit.webinar}
              </Typography>
            </div>
            {benefit.telekonsultasi && (
              <div className='benefit-item'>
                <Typography
                  variant='subtitle2'
                  className={classes.benefitPlusTitle}
                >
                  Telekonsultasi Dokter Spesialis
                </Typography>
                <Typography
                  variant='subtitle2'
                  className={classes.benefitPlusValue}
                >
                  {benefit.webinar}
                </Typography>
              </div>
            )}
            {benefit.note && (
              <Typography variant='subtitle2' className={classes.note}>
                {benefit.note}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
