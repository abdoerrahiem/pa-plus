import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import Alert from '../components/Alert'
import TransactionSummary from '../components/TransactionSummary'

const Result = () => {
  const [data, setData] = useState({})

  useEffect(() => {
    fetch('http://localhost:5000/transactions/1')
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

export default Result
