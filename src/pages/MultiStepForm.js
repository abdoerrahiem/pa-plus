import React, { useState } from 'react'
import { useForm, useStep } from 'react-hooks-helper'
import DateFnsUtils from '@date-io/date-fns'
import { Paket } from '../components/stepForm/Paket'
import { Personal } from '../components/stepForm/Personal'
import { Review } from '../components/stepForm/Review'
import { Submit } from '../components/stepForm/Submit'

const defaultData = {
  type_paket: '',
  type_sepeda: '',
  tgl_awal: '',
  tgl_akhir: '',
  nama: '',
  email: '',
  type_kelamin: '',
  type_id: '',
  no_id: '',
  tgl_lahir: '',
  phone: '',
  quotes_id: '',
  almt_email: '',
}

const steps = [
  { id: 'paket' },
  { id: 'personal' },
  { id: 'review' },
  { id: 'submit' },
]

export const MultiStepForm = () => {
  const [tanggalAwal, setTanggalAwal] = useState('')
  const [tanggalAkhir, setTanggalAkhir] = useState('')
  const [orderId, setOrderId] = useState(null)
  const [planbiaya, setPlanbiaya] = useState()
  const [quotes, setQuotes] = useState(null)
  const [invoice, setInvoice] = useState(null)

  const [formData, setForm] = useForm(defaultData)
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  })

  const handleDate = (e) => {
    const date = e.getDate()
    const month = e.getMonth()
    const year = e.getFullYear()
    // const data = e.target.value.split('-')
    // setTanggalAwal(e.target.value)
    setTanggalAwal(e)
    setTanggalAkhir(`${date}/${month + 1}/${year + 1}`)
    //setTanggalAkhir(`${Number(data[0]) + 1}/${data[1]}/${data[2]}`)
    // setTanggalAkhir(`${data[2]}/${data[1]}/${Number(data[0]) + 1}`)
  }

  const props = {
    formData,
    setForm,
    navigation,
    tanggalAwal,
    tanggalAkhir,
    handleDate,
    orderId,
    setOrderId,
    setPlanbiaya,
    planbiaya,
    quotes,
    setQuotes,
    invoice,
    setInvoice,
  }

  switch (step.id) {
    case 'paket':
      return <Paket {...props} />
    case 'personal':
      return <Personal {...props} />
    case 'review':
      return <Review {...props} />
    case 'submit':
      return <Submit {...props} />
    default:
      return
  }
}

export default MultiStepForm
