import React, { useState, useEffect, forwardRef } from 'react'
import Container from '@material-ui/core/Container'
import Icon from '@material-ui/core/Icon'
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CancelIcon from '@material-ui/icons/Cancel'
import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded'
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import '../stepForm/style.css'
import {
  TextField,
  FormControl,
  ButtonGroup,
  InputAdornment,
  Select,
  MenuItem,
  Grid,
  Button,
  InputLabel,
  Typography,
} from '@material-ui/core'
import Modal from '../Modal'
import Loading from '../Loading'
import Errormodal from '../Error'
import { SignalCellularNull } from '@material-ui/icons'
import convert from '../../utils/convert'
import Slogan from '../Slogan'
import BenefitMobile from '../BenefitMobile'
import PopUp from '../PopUp'
import Benefit from '../Benefit'

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: '#ffff',
    color: '#000',
    fontweight: 'bold',
    fontFamily: 'Arial',
  },
  subtitle1: {
    color: '#ffc20f',
    fontSize: '18px',
    marginBottom: '10px',
  },
  formControl: {
    margin: '20px 0',
  },
  dateTitle: {
    color: '#9e9e9e',
  },
  dateTitleWarning: {
    color: '#9e9e9e',
    fontSize: '12px',
    fontFamily: 'Roboto',
    margin: '7px 0',
  },
  benefitPlusTitle: {
    fontWeight: 'bold',
    lineHeight: 1.5,
  },
}))

export const Paket = ({
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
  quotesid,
}) => {
  const { type_paket, type_sepeda, tgl_awal, tgl_akhir } = formData
  const [showModal, setShowModal] = useState(false)
  const [order, setOrder] = useState(SignalCellularNull)
  const [paket, setPaket] = useState([])
  const [loadingModal, setLoadingModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [isPopUp, setIsPopUp] = useState(true)

  // useEffect(() => {
  //   fetch('https://uatechannel.etiqa.co.id/api/pa_plus/plan')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPaket(data)
  //     })
  // }, [])

  // <-- funtion get year -->
  let tgggl = formData.tgl_awal
  let ax = new Date(tgggl)
  let dayx = ax.getDate()
  if (String(dayx).length === 1) {
    dayx = '0' + dayx
  }
  let monthyear = ax.getMonth() + 1
  if (String(monthyear).length === 1) {
    monthyear = '0' + monthyear
  }
  let addyear = ax.getFullYear(formData.tgl_awal) + 1
  let tgl_end = addyear + '/' + monthyear + '/' + dayx
  // <-- funtion get year -->

  // <-- funtion datepicker -->
  let a = new Date()
  let year = a.getFullYear()
  let month = a.getMonth() + 1
  if (String(month).length === 1) {
    month = '0' + month
  }
  let day = a.getDate()
  if (String(day).length === 1) {
    day = '0' + day
  }
  // <-- funtion datepicker -->

  // <-- funtion datepicker 2 -->
  let datatoday = new Date()
  let datatodays = datatoday.setDate(new Date(datatoday).getDate() + 7)
  let adayy = new Date(datatodays)
  let years = adayy.getFullYear()

  let months = adayy.getMonth() + 1
  if (String(months).length === 1) {
    months = '0' + months
  }
  let adays = adayy.getDate()
  if (String(adays).length === 1) {
    adays = '0' + adays
  }
  // <-- funtion datepicker 2 -->

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)
  const handleStart = () => setLoadingModal(true)
  const handleEnd = () => setLoadingModal(false)
  const handleErrorOpen = () => setErrorModal(true)
  const handleErrorClose = () => setErrorModal(false)

  const handleSubmit = async () => {
    setShowModal(true)
    // if (type_paket !== '' && tanggalAwal !== '') {
    //   try {
    //     handleStart()
    //     const res = await fetch(
    //       'https://uatechannel.etiqa.co.id/api/pa_plus/quotes/calculate_premium',
    //       //'https://buy.etiqa.co.id/api/pa_plus/quotes/calculate_premium',
    //       {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           product_id: 'PA-P',
    //           sum_insured_1: '1',
    //           sum_insured_2: 0,
    //           sum_insured_3: 0,
    //           sum_insured_4: 0,
    //           sum_insured_5: 0,
    //           include_ext_cover_f: 0,
    //           inception_date: tanggalAwal.toISOString().slice(0, 10),
    //           coverage_id: 'ECHAN-PAP',
    //           coverage_codes: [],
    //           paplus_detail: {
    //             occupation_id: null,
    //             sum_insured_level: null,
    //             gender: '',
    //             birth_date: tanggalAwal.toISOString().slice(0, 10),
    //             name: '',
    //             id_number: null,
    //             b_flag: 'true',
    //             c_flag: 'true',
    //             beneficiary_name: '',
    //             beneficiary_contact: '',
    //             plan_desc:
    //               type_paket === 'PAPF1'
    //                 ? 'Family Silver'
    //                 : type_paket === 'PAPF2'
    //                 ? 'Family Gold'
    //                 : type_paket === 'PAPF3'
    //                 ? 'Family Platinum'
    //                 : type_paket === 'PAPI1'
    //                 ? 'Individual Silver'
    //                 : type_paket === 'PAPI2'
    //                 ? 'Individual Gold'
    //                 : 0,
    //           },
    //           plan: type_paket,
    //         }),
    //       }
    //     )
    //     const data = await res.json()
    //     // console.log(data)
    //     setPlanbiaya(data)
    //     handleEnd()
    //     handleOpen()
    //   } catch (error) {
    //     handleErrorOpen()
    //     //handleClose()
    //     //handleEnd()
    //   }
    // }
    // //handleOpen()
  }

  const classes = useStyles()

  return (
    <>
      <PopUp open={isPopUp} handleClose={() => setIsPopUp(false)} />
      <Modal showModal={showModal} handleClose={handleClose}>
        <div className='modal-content'>
          <h5>Anda memilih paket :</h5>
          <h2>
            {type_paket && type_paket === 'PAPF1'
              ? 'Family Silver'
              : type_paket && type_paket === 'PAPF2'
              ? 'Family Gold'
              : type_paket && type_paket === 'PAPF3'
              ? 'Family Platinum'
              : type_paket && type_paket === 'PAPI1'
              ? 'Individual Silver'
              : type_paket && type_paket === 'PAPI2'
              ? 'Individual Gold'
              : 'Paket belum dipilih'}
          </h2>
          <h5>Rincian Biaya :</h5>
          <h2>
            {' '}
            Rp{' '}
            {planbiaya && planbiaya.total_payable
              ? convert(planbiaya.total_payable)
              : 0}{' '}
            / tahun
          </h2>
        </div>
        <div className='modal-buttons'>
          <button onClick={handleClose}>
            <ArrowBackIcon /> <span>Batal</span>
          </button>
          <button
            // disabled={
            //   !type_paket ||
            //   !tanggalAwal ||
            //   (planbiaya && planbiaya.total_payable === 0)
            // }
            onClick={() => {
              console.log(planbiaya)
              navigation.next()
            }}
          >
            <span>Lanjut</span> <ArrowForwardIcon />
          </button>
        </div>
      </Modal>

      <Loading showModal={loadingModal} handleClose={handleEnd}>
        <img
          mx='auto'
          width={250}
          height={150}
          align='center'
          justifyContent='center'
          src={require('../assets/loading.gif')}
        />
      </Loading>

      <Errormodal showModal={errorModal} handleErrorClose={handleErrorClose}>
        <img
          mx='auto'
          width={220}
          height={150}
          align='center'
          justifyContent='center'
          src={require('../assets/error_connection.png')}
        />
        <Typography variant='subtitle1' style={{ fontFamily: 'Arial' }}>
          <strong>
            {' '}
            Mohon Maaf, layanan sedang sibuk. Silahkan mencoba kembali.
          </strong>
        </Typography>
        <Button
          variant='contained'
          justifyContent='center'
          startIcon={<CancelIcon />}
          onClick={() => window.location.reload(false)}
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            fontFamily: 'Arial',
          }}
        >
          <strong>Keluar</strong>
        </Button>
      </Errormodal>

      <Slogan />
      <Container
        maxWidth='lg'
        spacing={2}
        style={{
          marginTop: '20px',
        }}
      >
        <Grid container className='backleft'>
          {/* ----- start left form  ----  */}
          <BenefitMobile />
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              background: '#ffffff',
              padding: '30px',
              position: 'relative',
            }}
          >
            <FormControl className={classes.formControl} fullWidth>
              <Typography
                variant='subtitle1'
                align='left'
                component='subtitle1'
                className={classes.subtitle1}
              >
                <strong>Paket</strong>
              </Typography>
              <Select
                displayEmpty
                name='type_paket'
                id='type_paket'
                value={formData.type_paket}
                onChange={setForm}
              >
                <MenuItem value='' selected disabled>
                  Pilih Paket
                </MenuItem>
                {/* {paket.map((pk) => (
                  <MenuItem key={pk.id} value={pk.id}>
                    {pk.description}
                  </MenuItem>
                ))} */}
                <MenuItem value='PAPI1'>Individual Silver</MenuItem>
                <MenuItem value='PAPI2'>Individual Gold</MenuItem>
                <MenuItem value='PAPF1'>Family Silver</MenuItem>
                <MenuItem value='PAPF2'>Family Gold</MenuItem>
                <MenuItem value='PAPF3'>Family Platinum</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <Typography variant='subtitle1' className={classes.subtitle1}>
                <strong>Periode Asuransi</strong>
              </Typography>
              <Typography variant='subtitle1' className={classes.dateTitle}>
                Tanggal Mulai :
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin='normal'
                  id='tgl_awal'
                  name='tgl_awal'
                  format='dd/MM/yyyy'
                  value={
                    tanggalAwal
                      ? tanggalAwal
                      : new Date(`${year}-${month}-${day}`)
                  }
                  onChange={(e) => handleDate(e)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  minDate={new Date(`${year}-${month}-${day}`)}
                  maxDate={new Date(`${years}-${months}-${adays}`)}
                />
              </MuiPickersUtilsProvider>
              <label className={classes.dateTitleWarning}>
                <em>
                  Pilih diantara {day + '/' + month + '/' + year} hingga{' '}
                  {adays + '/' + months + '/' + years}{' '}
                </em>
              </label>
              <Typography variant='subtitle1' className={classes.dateTitle}>
                Tanggal Akhir :
              </Typography>
              <Typography
                variant='subtitle1'
                style={{
                  marginBottom: '20px',
                }}
              >
                <em>{tanggalAkhir}</em>
              </Typography>
            </FormControl>
            <button
              className='buy-now-button'
              // disabled={!type_paket || !type_sepeda || !tanggalAwal}
              onClick={handleSubmit}
            >
              <img src={require('../assets/btn_beli_normal.png')} alt='' />
            </button>
          </Grid>

          {/* ----- end left form  ----  */}

          {/* ----- start right form  ----  */}
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              padding: '0 50px',
            }}
            className='right-grid'
          >
            <Typography
              variant='h4'
              style={{ marginTop: '-10px', marginBottom: '20px' }}
            >
              <strong>Manfaat PLUS untuk Anda</strong>
            </Typography>
            <Benefit />
          </Grid>
          {/* <----- end right form  ---->  */}
        </Grid>
      </Container>
    </>
  )
}
