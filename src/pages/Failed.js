import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from '@material-ui/core'
import Alert from '../components/Alert2'
import TransactionSummary from '../components/TransactionFailed'

const Failed = () => {
  const [data, setData] = useState({})
  const { search } = useLocation()
  const orderId = search.split('&')[1].split('=')[1]
  
  useEffect(() => {
    fetch(`https://uatechannel.etiqa.co.id/api/pa_plus/invoices/${orderId}/policy`)

      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error))
  }, [])

  return (
    <Container maxWidth='sm' className='result'>
      {Object.keys(data).length === 0 ? <Alert error /> : <Alert success />}
      <TransactionSummary data={data} />
    </Container>
  )
}

export default Failed
