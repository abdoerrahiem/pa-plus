import React from 'react'
import { Divider, Typography } from '@material-ui/core'

export default function Stepper({ step }) {
  return (
    <div className='stepper'>
      <ul class='progressBar'>
        <li className={`${step === 'personal' ? 'active' : ''}`}>
          <Typography>Data Pribadi</Typography>
        </li>
        <li className={`${step === 'review' ? 'active' : ''}`}>
          <Typography>Ringkasan</Typography>
        </li>
      </ul>
    </div>
  )
}
