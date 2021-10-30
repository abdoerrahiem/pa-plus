import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

import Benefit from './Benefit'

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
    flexDirection: 'column',
    padding: '30px',
    backgroundImage: `url(${require('./assets/banner-mobile-01.png')})`,
    backgroundSize: 'cover',
  },
  accordionSummary: {
    marginBottom: '5px',
    backgroundColor: '#ffc20f',
  },
})

export default function BenefitMobile() {
  const classes = useStyles()

  return (
    <div className='benefit-mobile'>
      <Accordion className={classes.accordion} elevation={0} square>
        <AccordionSummary
          expandIcon={<ArrowDropDown />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.accordionSummary}
        >
          <Typography variant='h6' className={classes.accordionTitle}>
            Manfaat PLUS untuk Anda
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <Benefit />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
