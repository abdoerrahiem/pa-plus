import React, { useState, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import Snackbar from '@material-ui/core/Snackbar'
import StepLabel from '@material-ui/core/StepLabel'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import EmailIcon from '@material-ui/icons/Email'
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CancelIcon from '@material-ui/icons/Cancel'
import StepConnector from '@material-ui/core/StepConnector'
import Check from '@material-ui/icons/Check'
import '../stepForm/style.css'
import {
  TextField,
  FormLabel,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputAdornment,
  Grid,
  Button,
  ButtonGroup,
  Typography,
  Divider,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import getAge from '../../utils/getAge'
import convert from '../../utils/convert'
import Modal from '../Modal'
import Errormodal from '../Error'
import Ringkasan from '../Ringkasan'
import {
  PersonOutline,
  PhoneInTalkRounded,
  EmailOutlined,
  AssignmentIndOutlined,
  Redeem,
} from '@material-ui/icons'
import RingkasanMobile from '../RingkasanMobile'
import Stepper from '../Stepper'

export const Personal = ({
  formData,
  setForm,
  navigation,
  tanggalAwal,
  tanggalAkhir,
  orderId,
  setPlanbiaya,
  planbiaya,
  quotes,
  setQuotes,
  invoice,
  setInvoice,
}) => {
  const {
    nama,
    type_kelamin,
    type_id,
    no_id,
    tgl_awal,
    e_mail,
    tgl_lahir,
    phone,
    almt_email,
    type_paket,
    type_sepeda,
    quotes_id,
  } = formData
  const steps = ['Data Pribadi', 'Ringkasan']

  // <-- funtion datepicker umur -->
  let ap = new Date()
  let yearp = ap.getFullYear() - 17
  let monthp = ap.getMonth()
  if (String(monthp).length === 1) {
    monthp = '0' + monthp
  }
  let dayp = ap.getDate()
  if (String(dayp).length === 1) {
    dayp = '0' + dayp
  }
  let addyear17 = ap.getFullYear() - 17
  let addyear60 = ap.getFullYear() - 60

  // <-- funtion datepicker umur -->

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

  const [nameError, setNameError] = useState(false)
  const [kelaminError, setKelaminError] = useState(false)
  const [jenisIdError, setJenisIdError] = useState(false)
  const [nomorIdError, setNomorIdError] = useState(false)
  const [tanggalLahirError, setTanggalLahirError] = useState(false)
  const [ageWarning, setAgeWarning] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [nomorTeleponError, setNomorTeleponError] = useState(false)
  const [isProperPhone, setIsProperPhone] = useState(false)
  const [error, setError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [voucher, setVoucher] = useState(null)
  const [voucherError, setVoucherError] = useState(null)
  const [voucherSuccess, setVoucherSuccess] = useState(null)
  const [showSnackbar, setShowSnackbar] = useState(false)

  const createQuote = async () => {
    try {
      const res = await fetch(
        'https://uatechannel.etiqa.co.id/api/pa_plus/quotes',
        //'https://buy.etiqa.co.id/api/pa_plus/quotes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_id: 'PA-P',
            sum_insured_1: 1,
            sum_insured_2: 0,
            sum_insured_3: 0,
            sum_insured_4: 0,
            sum_insured_5: 0,
            include_ext_cover_f: 0,
            inception_date: tanggalAwal.toISOString().slice(0, 10),
            coverage_id: 'ECHAN-PAP',
            paplus_detail: {
              occupation_id: '',
              sum_insured_level: '',
              gender: '',
              birth_date: tanggalAwal.toISOString().slice(0, 10),
              name: '',
              id_number: '',
              b_flag: false,
              c_flag: false,
              beneficiary_name: '',
              beneficiary_contact: '',
              plan_desc:
                type_paket === 'PAPF1'
                  ? 'Family Silver'
                  : type_paket === 'PAPF2'
                  ? 'Family Gold'
                  : type_paket === 'PAPF3'
                  ? 'Family Platinum'
                  : type_paket === 'PAPI1'
                  ? 'Individual Silver'
                  : type_paket === 'PAPI2'
                  ? 'Individual Gold'
                  : 0,
            },
            plan: type_paket,
            coverage_codes: [],
          }),
        }
      )

      const data = await res.json()
      //console.log(data)
      setQuotes(data)
    } catch (error) {
      handleErrorOpen()
      //console.log(error)
    }
  }

  useEffect(() => {
    createQuote()
  }, [])

  const handleSubmit = async () => {
    navigation.next()
    // try {
    //   const res = await fetch('', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       product_id: '1110',
    //       sum_insured_1:
    //         type_paket === 1 ? 25000 : type_paket === 2 ? 70000 : 0,
    //       sum_insured_2: 0,
    //       sum_insured_3: 0,
    //       sum_insured_4: 0,
    //       sum_insured_5: 0,
    //       include_ext_cover_f: 0,
    //       inception_date: tanggalAwal,
    //       coverage_id: 'ECHAN-PAC',
    //       cycling_detail: {
    //         sum_insured_level: type_paket,
    //         gender: '',
    //         birth_date: tanggalAwal,
    //         name: '',
    //         id_number: null,
    //         b_flag: 'true',
    //         c_flag: 'true',
    //         beneficiary_name: '',
    //         beneficiary_contact: '',
    //         cycling_brand: type_sepeda,
    //       },
    //       coverage_codes: [],
    //     }),
    //   })

    //   if (res.ok) {
    //     navigation.next()
    //   }
    // } catch (error) {
    //   handleErrorOpen()
    //   console.log(error)
    // }
  }

  const handleBlur = (event, setError) => {
    if (event === '') {
      setError(true)
    } else {
      setError(false)
    }
  }

  const handleOpen = async () => {
    if (
      nama === '' ||
      type_kelamin === '' ||
      type_id === '' ||
      no_id === '' ||
      tgl_lahir === '' ||
      phone === '' ||
      almt_email === ''
    ) {
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 3000)
    } else {
      try {
        const res = await fetch(
          //`https://buy.etiqa.co.id/api/pa_plus/quotes/${quotes.id}/customer`,
          `https://uatechannel.etiqa.co.id/api/pa_plus/quotes/${quotes.id}/customer`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: nama,
              email: almt_email,
              id_number: no_id,
              id_type: type_id,
              telephone_number: phone,
              gender: type_kelamin,
              birth_date: tgl_lahir,
              id_name: nama,
              id_citizenship: '',
              care_user_id: '',
              zipcode: '',
              address_1: '',
              address_2: '',
              address_3: '',
            }),
          }
        )

        const data = await res.json()

        if (res.ok) {
          //console.log(data)
          setShowModal(true)
        }
      } catch (error) {
        handleErrorOpen()
        //console.log(error)
      }
    }
    // setShowModal(true)
  }

  const handleClose = () => setShowModal(false)
  const handleClick = (setError) => setError(false)
  const handleErrorOpen = () => setErrorModal(true)
  const handleErrorClose = () => setErrorModal(false)

  const handleSubmitVoucher = () => {
    if (!voucher) {
      setVoucherError('Kode voucher kosong!')
    } else {
      fetch(`http://localhost:5000/vouchers?voucher=${voucher}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setVoucherSuccess('Selamat, Voucher berhasil diklaim')
            setShowSnackbar(true)
            // do something to state
          } else {
            setVoucherError('Kode voucher tidak valid!')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <>
      <Modal showModal={showModal} handleClose={handleClose}>
        <div className='modal-content'>
          <h6>Apakah data yang dimasukkan sudah benar?</h6>
          <h6>Jika iya, silahkan klik lanjut.</h6>
        </div>
        <div className='modal-buttons'>
          <button onClick={handleClose}>
            <ArrowBackIcon /> <span>Batal</span>
          </button>
          <button
            disabled={!type_paket || !tanggalAwal}
            onClick={() => navigation.next()}
          >
            <span>Lanjut</span> <ArrowForwardIcon />
          </button>
        </div>
      </Modal>

      {/* <Errormodal showModal={errorModal} handleErrorClose={handleErrorClose}>
        <img
            mx='auto'
            width={220}
            height={150}
            align='center'
            justifyContent='center'
            /assets/error_connection.png')}
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

      <Container
        maxWidth='md'
        style={{
          marginTop: '20px',
          // paddingTop: '20px',
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={7}
            style={{
              // position: 'relative',
              paddingRight: '20px',
              paddingTop: '20px',
            }}
            className='personal-grid-1'
          >
            <Stepper step='personal' />
            <div className='clear'>
              <Typography
                variant='h5'
                style={{
                  color: '#ffc20f',
                  fontWeight: 'bold',
                }}
              >
                Data Pribadi
              </Typography>
              <Typography
                variant='subtitle1'
                style={{
                  marginBottom: '5px',
                }}
              >
                Lengkapi Informasi Anda
              </Typography>
            </div>
            {/* <RingkasanMobile
              planbiaya={planbiaya}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
            /> */}
            <div className='personal-form'>
              <FormControl className='personal-form-control' fullWidth>
                <Typography
                  variant='subtitle1'
                  component='subtitle1'
                  gutterBottom
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Nama </strong>
                </Typography>
                <TextField
                  error={nameError}
                  onClick={() => handleClick(setNameError)}
                  onBlur={() => handleBlur(nama, setNameError)}
                  helperText={nameError ? 'Masukkan nama lengkap' : null}
                  size='small'
                  //variant='outlined'
                  name='nama'
                  id='nama'
                  onChange={setForm}
                  autoComplete='off'
                  onKeyPress={(event) => {
                    if (!/^[a-zA-Z\s]+$/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl className='personal-form-control'>
                <Typography
                  variant='subtitle1'
                  component='subtitle1'
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Jenis Kelamin </strong>
                </Typography>
                <RadioGroup
                  aria-label='Jenis Kelamin'
                  name='type_kelamin'
                  id='type_kelamin'
                  onChange={setForm}
                  row
                  error={kelaminError}
                  onClick={() => handleClick(setKelaminError)}
                  onBlur={() => handleBlur(type_kelamin, setKelaminError)}
                  helperText={kelaminError ? 'Pilih jenis kelamin' : null}
                >
                  <FormControlLabel
                    value='Pria'
                    control={<Radio />}
                    label='Pria'
                  />
                  <FormControlLabel
                    value='Wanita'
                    control={<Radio />}
                    label='Wanita'
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className='personal-form-control' fullWidth>
                <Typography
                  variant='subtitle1'
                  align='left'
                  component='subtitle1'
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Jenis ID </strong>
                </Typography>
                <Select
                  name='type_id'
                  id='type_id'
                  onChange={setForm}
                  error={jenisIdError}
                  style={{ fontFamily: 'Arial' }}
                  onClick={() => handleClick(setJenisIdError)}
                  onBlur={() => handleBlur(type_id, setJenisIdError)}
                  helperText={jenisIdError ? 'Pilih salah satu jenis ID' : null}
                >
                  <MenuItem value='' selected disabled>
                    <em>Pilihan Jenis ID</em>
                  </MenuItem>
                  <MenuItem value='KTP'>KTP</MenuItem>
                  <MenuItem value='SIM'>SIM</MenuItem>
                  <MenuItem value='Passport'>Pasport</MenuItem>
                </Select>
              </FormControl>
              <FormControl className='personal-form-control' fullWidth>
                <Typography
                  variant='subtitle1'
                  component='subtitle1'
                  gutterBottom
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Nomor ID </strong>
                </Typography>
                <TextField
                  id='standard-error-helper-text'
                  error={nomorIdError}
                  onClick={() => handleClick(setNomorIdError)}
                  onBlur={() => handleBlur(no_id, setNomorIdError)}
                  helperText={nomorIdError ? 'Masukkan nomor ID' : null}
                  size='small'
                  //variant='outlined'
                  name='no_id'
                  id='no_id'
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  onChange={setForm}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AssignmentIndOutlined />
                      </InputAdornment>
                    ),
                    inputProps: { maxLength: 16 },
                  }}
                />
              </FormControl>
              <FormControl className='personal-form-control' fullWidth>
                <Typography
                  variant='subtitle1'
                  component='subtitle1'
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Tanggal Lahir </strong>
                </Typography>
                <TextField
                  error={tanggalLahirError || ageWarning}
                  onClick={() => handleClick(setTanggalLahirError)}
                  onBlur={() => {
                    handleBlur(tgl_lahir, setTanggalLahirError)
                    if (getAge(tgl_lahir) < 17 || getAge(tgl_lahir) > 60) {
                      setAgeWarning(true)
                    } else {
                      setAgeWarning(false)
                    }
                  }}
                  helperText={
                    tanggalLahirError
                      ? 'Masukkan tanggal lahir anda'
                      : ageWarning
                      ? 'Minimal usia 17 s/d 60 tahun'
                      : null
                  }
                  type='date'
                  id='tgl_lahir'
                  name='tgl_lahir'
                  onChange={setForm}
                  size='small'
                  InputProps={{
                    inputProps: {
                      min: addyear60 + '-' + monthp + '-' + dayp,
                      max: addyear17 + '-' + monthp + '-' + dayp,
                    },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  //variant='outlined'
                  fullWidth
                />
              </FormControl>
              <FormControl className='personal-form-control' fullWidth>
                <Typography
                  variant='subtitle1'
                  component='subtitle1'
                  gutterBottom
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Alamat Email </strong>
                </Typography>
                <TextField
                  error={emailError || isEmail}
                  onClick={() => handleClick(setEmailError)}
                  onBlur={() => {
                    handleBlur(almt_email, setEmailError)
                    if (
                      !almt_email.match(
                        '^[\\W]*([\\w+\\-.%]+@[\\w\\-.]+\\.[A-Za-z] {2,4}[\\W]*,{1}[\\W]*)*([\\w+\\-.%]+@[\\w\\-.]+\\.[A-Za-z]{2,4})[\\W]*$'
                      )
                    ) {
                      setIsEmail(true)
                    } else {
                      setIsEmail(false)
                    }
                  }}
                  helperText={
                    emailError
                      ? 'Masukkan alamat email anda'
                      : isEmail
                      ? 'Email anda tidak valid'
                      : null
                  }
                  size='small'
                  name='almt_email'
                  id='almt_email'
                  onChange={setForm}
                  autoComplete='off'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl className='personal-form-control' fullWidth>
                <Typography
                  variant='subtitle1'
                  component='subtitle1'
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Nomor Telepon </strong>
                </Typography>
                <TextField
                  error={nomorTeleponError || isProperPhone}
                  onClick={() => handleClick(setNomorTeleponError)}
                  onBlur={() => {
                    handleBlur(phone, setNomorTeleponError)
                    if (!phone.match(/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/g)) {
                      setIsProperPhone(true)
                    } else {
                      setIsProperPhone(false)
                    }
                  }}
                  helperText={
                    nomorTeleponError
                      ? 'Masukkan nomor telepon'
                      : isProperPhone
                      ? 'Nomor telepon tidak valid'
                      : null
                  }
                  name='phone'
                  id='phone'
                  size='small'
                  onChange={setForm}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault()
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PhoneInTalkRounded />
                      </InputAdornment>
                    ),
                    inputProps: { maxLength: 13 },
                  }}
                />
              </FormControl>
              <FormControl className='personal-form-control' fullWidth>
                <Typography
                  variant='subtitle1'
                  component='subtitle1'
                  style={{ fontFamily: 'Arial', color: '#ffc20f' }}
                >
                  <strong> Kode Voucher </strong> (Diisi jika ada)
                </Typography>
                <view className='personal__claim'>
                  <TextField
                    disabled={voucherSuccess}
                    error={voucherError}
                    onFocus={() => setVoucherError(null)}
                    helperText={voucherError ?? null}
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Redeem />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant='contained'
                    color='#ffc20f'
                    onClick={handleSubmitVoucher}
                    disabled={voucherSuccess}
                  >
                    Submit Kode Voucher
                  </Button>
                </view>
                <Snackbar
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  open={showSnackbar}
                  autoHideDuration={5000}
                  onClose={() => setShowSnackbar(false)}
                >
                  <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity='success'
                  >
                    {voucherSuccess}
                  </Alert>
                </Snackbar>
              </FormControl>
              {error && (
                <Alert severity='error'>
                  Silahkan lengkapi semua form field!
                </Alert>
              )}
              <div className='personal-form-buttons'>
                <button onClick={() => navigation.previous()} />
                <button
                  disabled={
                    nameError ||
                    kelaminError ||
                    jenisIdError ||
                    nomorIdError ||
                    tanggalLahirError ||
                    ageWarning ||
                    emailError ||
                    isEmail ||
                    nomorTeleponError ||
                    isProperPhone
                  }
                  onClick={handleOpen}
                />
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            style={{
              borderLeft: '1px solid #ccc',
              paddingLeft: '20px',
              paddingTop: '30px',
            }}
            className='personal-grid-2'
          >
            {/* <Ringkasan
              planbiaya={planbiaya}
              tanggalAwal={tanggalAwal}
              tanggalAkhir={tanggalAkhir}
            /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
