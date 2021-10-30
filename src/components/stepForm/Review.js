import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import FormGroup from '@material-ui/core/FormGroup'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetail from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
//import EditIcon from '@material-ui/icons/Edit'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CancelIcon from '@material-ui/icons/Cancel'
import convert from '../../utils/convert'
import Modal from '../Modal'
import Loading from '../Loading'
import Errormodal from '../Error'
//import { Link } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import '../stepForm/style.css'
import {
  Grid,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core'
import Ringkasan from '../Ringkasan'
import RingkasanMobile from '../RingkasanMobile'
import Stepper from '../Stepper'

export const Review = ({
  formData,
  navigation,
  planbiaya,
  tanggalAwal,
  tanggalAkhir,
  quotes,
  setQuotes,
}) => {
  const { go } = navigation
  const {
    type_paket,
    type_sepeda,
    tgl_awal,
    tgl_akhir,
    nama,
    type_kelamin,
    type_id,
    no_id,
    tgl_lahir,
    e_mail,
    phone,
    almt_email,
    quotes_id,
  } = formData
  const [getdataxx, setGetdata] = useState()
  const steps = ['Data Pribadi', 'Ringkasan']
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)
  const [showinvoice, setShowMinvoice] = useState(false)
  const [invoice2, setInvoice2] = useState(null)
  const [loadingModal, setLoadingModal] = useState(false)
  const [detailQuotes, setDetailQuotes] = useState(null)
  const [errorModal, setErrorModal] = useState(false)

  const handleOpenInvoice = () => setShowMinvoice(true)
  const handleCloseInvoice = () => setShowMinvoice(false)
  const handleStart = () => setLoadingModal(true)
  const handleEnd = () => setLoadingModal(false)
  const handleErrorOpen = () => setErrorModal(true)
  const handleErrorClose = () => setErrorModal(false)

  // <-- funtion get tgl awal year -->
  let tggglp = tanggalAwal
  let axp = new Date(tggglp)
  let dayxp = axp.getDate()
  if (String(dayxp).length === 1) {
    dayxp = '0' + dayxp
  }
  let monthyearp = axp.getMonth() + 1
  if (String(monthyearp).length === 1) {
    monthyearp = '0' + monthyearp
  }
  let addyearawal = axp.getFullYear(formData.tgl_awal)
  let tgl_awalp = dayxp + '-' + monthyearp + '-' + addyearawal
  // <-- funtion get tgl awal year -->

  const getDataQuotes = async () => {
    try {
      const res = await fetch(
      //  `https://buy.etiqa.co.id/api/pa_plus/quotes/${quotes.id}`,
        `https://uatechannel.etiqa.co.id/api/pa_plus/quotes/${quotes.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const dataxx = await res.json()
      setDetailQuotes(dataxx)
      //console.log(dataxx)
    } catch (error) {
      handleErrorOpen()
      //console.log(error)
    }
  }

  useEffect(() => {
    // getDataQuotes()
    //getInvoice()
  }, [])

  const handleClick = async () => {
    handleStart()
    //navigation.next()
    try {
      const res = await fetch(
      //  `https://buy.etiqa.co.id/api/pa_plus/quotes/${quotes.id}/invoice`,
        `https://uatechannel.etiqa.co.id/api/pa_plus/quotes/${quotes.id}/invoice`,

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const dataz = await res.json()
      setInvoice2(dataz)
      setShowMinvoice(true)
      handleEnd()
    } catch (error) {
      handleEnd()
      handleErrorOpen()
      //console.log(error)
    }
  }

  const labelzzzz = (
    <span>
      Saya telah membaca dan menyetujui&nbsp;
      <a href='./PA-Plus-Etiqa.pdf' download>
        Lembar Keterangan Produk
      </a>
    </span>
  )

  const date = tanggalAwal.getDate()
  const month = tanggalAwal.getMonth()
  const year = tanggalAwal.getFullYear()

  return (
    <>
      <Modal showModal={showinvoice} handleClose={handleCloseInvoice}>
        <div className='modal-content'>
          <h6> Pemesanan Berhasil. <br /></h6>
          <h6> Untuk menyelesaikan transaksi Anda, Silahkan lanjutkan ke Pembayaran.</h6>
        </div>
        <div className='modal-buttons'>
          {invoice2 && invoice2.snap_token_detail.redirect_url && (
            <a href={invoice2.snap_token_detail.redirect_url} className='button-bayar'>
              <span>Bayar</span> <ArrowForwardIcon />
            </a>
          )}
        </div>

      </Modal>

      <Loading showModal={loadingModal} handleClose={handleEnd}>
        <img
          mx='auto'
          width={250}
          height={150}
          justifyContent='center'
          src={require('../assets/loading.gif')}
        />
      </Loading>

      {/* <Errormodal showModal={errorModal} handleErrorClose={handleErrorClose}>
        <img
            mx='auto'
            width={220}
            height={150}
            align='center'
            justifyContent='center'
            src={require('../assets/error_connection.png')}
          />
          <Typography variant="subtitle1" style={{fontFamily: "Arial"}}><strong>Maaf layanan kami sedang sibuk!</strong></Typography>
          <Button
              variant='contained'
              justifyContent="center"
              startIcon={<CancelIcon />}
              onClick={() => window.location.reload(false)}
              style={{backgroundColor: '#000000', color: '#ffffff', fontFamily: "Arial" }}
            >
              <strong>Keluar</strong>
            </Button>
      </Errormodal> */}

      <Container maxWidth='md' className='review-container'>
        <Grid container>
          <Grid item xs={12} md={7} className='review-grid-1'>
            <Stepper step='review' />
            <div className='clear'>
              <Typography
                variant='h5'
                style={{
                  color: '#ffc20f',
                  fontWeight: 'bold',
                }}
              >
                Ringkasan Data
              </Typography>
              <Typography
                variant='subtitle1'
                style={{
                  marginBottom: '5px',
                }}
              >
                Harap konfirmasikan detail anda sebelum lanjut ke Pembayaran
              </Typography>
            </div>
            <RingkasanMobile
              planbiaya={planbiaya}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
            />
            <div className='review-form'>
              <div className='review-form-data'>
                <div>
                  <p>Nama Paket :</p>
                  <p>
                    {type_paket === 'PAPF1'
                      ? 'Family Silver'
                      : type_paket === 'PAPF2'
                      ? 'Family Gold'
                      : type_paket === 'PAPF3'
                      ? 'Family Platinum'
                      : type_paket === 'PAPI1'
                      ? 'Individual Silver'
                      : type_paket === 'PAPI2'
                      ? 'Individual Gold'
                      : 'Paket belum dipilih'}
                  </p>
                </div>
                <div>
                  <p>Tanggal Mulai :</p>
                  <p>{`${date}/${month + 1}/${year}`}</p>
                </div>
                <div>
                  <p>Tanggal Akhir :</p>
                  <p>{tanggalAkhir}</p>
                </div>
                <div>
                  <p>Nama Lengkap :</p>
                  <p>{nama}</p>
                </div>
                <div>
                  <p>Jenis Kelamin :</p>
                  <p>{type_kelamin}</p>
                </div>
                <div>
                  <p>Jenis ID :</p>
                  <p>{type_id}</p>
                </div>
                <div>
                  <p>Nomor ID :</p>
                  <p>{no_id}</p>
                </div>
                <div>
                  <p>Tanggal Lahir :</p>
                  <p>{new Date(tgl_lahir).toLocaleDateString('id')}</p>
                </div>
                <div>
                  <p>Email :</p>
                  <p>{almt_email}</p>
                </div>
                <div>
                  <p>No Telepon :</p>
                  <p>{phone}</p>
                </div>
              </div>

              <div className='review-form-pernyataan'>
                <h6>Pernyataan</h6>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='secondary'
                        name='saveAddress'
                        value='yes'
                        style={{
                          color: '#ffc20f',
                        }}
                        onChange={() => setCheck1(!check1)}
                      />
                    }
                    label={labelzzzz}
                    // label= {
                    //   <div>
                    //      <span>Saya telah membaca dan menyetujui </span>
                    //      <Link to={'../assets/PA-Cyclist-EtiQa.pdf'}>Lembar Keterangan Produk</Link>
                    //   </div>
                    //   }
                  />
                </FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      color='secondary'
                      name='saveAddress'
                      value='yes'
                      style={{
                        color: '#ffc20f',
                      }}
                      onChange={() => setCheck2(!check2)}
                    />
                  }
                  label='Anda secara tegas dan menyadari akan Persetujuan Undang-undang perlindungan Data Pribadi bahwa Kami dan/atau pihak eksternal memproses data personal Anda untuk promosi dan pemasaran'
                />
              </div>

              <div className='personal-form-buttons'>
                <button onClick={() => navigation.previous()} />
                <button onClick={handleClick} disabled={!check1 || !check2} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={5} className='review-grid-2'>
            <Ringkasan
              planbiaya={planbiaya}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

// export const RenderAccordion = ({ summary, details, go }) => (
//   //console.log(formData);

//   <Accordion>
//     <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//       {summary}
//     </AccordionSummary>
//     <AccordionDetail>
//       <div>
//         {details.map((data, index) => {
//           const objKey = Object.keys(data)[0]
//           const objValue = data[Object.keys(data)[0]]

//           return (
//             <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>
//           )
//         })}
// {/*
//         <IconButton
//           color='primary'
//           label='Edit'
//           component='span'
//           onClick={() => go(`${summary.toLowerCase()}`)}
//         >
//           <EditIcon />
//         </IconButton> */}
//       </div>
//     </AccordionDetail>
//   </Accordion>
// )
