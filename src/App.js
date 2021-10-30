import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import MultiStepForm from './pages/MultiStepForm'
import Result from './pages/Result'
import Failed from './pages/Failed'
import Loghead from './images/etiqa-logo.png'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
//import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import HomeIcon from '@material-ui/icons/Home'
import ListItemIcon from '@material-ui/core/ListItemIcon'
//import CloseIcon from "@material-ui/icons/Close";
//import Logofooter  from './images/logo_footer.png'

const useStyles = makeStyles({
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
})

const IgnoreDisabledListItem = React.forwardRef(function IgnoreDisabledListItem(
  { disabled, ...other },
  ref
) {
  return <ListItem {...other} ref={ref} />
})

const App = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClick = (pageURL) => {
    Redirect(pageURL)
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Router basename={'pa_plus/'}>
      <AppBar position='fixed' style={{ background: '#ffc20f' }} elevation={0}>
        <Toolbar>
          <Grid xs={4} item>
            <img
              mx='auto'
              p={1}
              width={91}
              height={39}
              src={Loghead}
              alt='Logo'
            />
          </Grid>
          <div className={classes.rightToolbar}>
            {isMobile ? (
              <>
                <IconButton
                  edge='start'
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='menu'
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem
                    onClick={() => window.open('https://www.etiqa.co.id/')}
                  >
                    <ListItemIcon>
                      <HomeIcon fontSize='small' />
                      <Typography variant='inherit'>
                        {' '}
                        <span> </span> Beranda{' '}
                      </Typography>
                    </ListItemIcon>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <section className={classes.rightToolbar}></section>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <Switch>
        <Route exact path='/daftar' component={MultiStepForm} />
        <Route exact path='/daftar/payment/handle/finish' component={Result} />
        <Route exact path='/daftar/payment/handle/error' component={Failed} />
      </Switch>
      <br /> <br />
      <Grid
        container
        direction='row'
        alignItems='center'
        justify='center'
        style={{ fontFamily: 'MetaPlus' }}
      >
        <Grid item><p style={{ fontFamily: 'MetaPlus', fontSize:'20px' }}> a member of &nbsp; </p></Grid>
        <Grid item>
          <img
            mx='auto'
            p={3}
            m={-6}
            width={30}
            height={30}
            src="https://www.etiqa.co.id/media/wlfczo2d/logo-mybank.png"
            alt='Logo'
          />
        </Grid>
        <Grid item>
          <p style={{ fontFamily: 'MetaPlus' }}>
            {' '}
            <strong> &nbsp; Maybank</strong> Group
          </p>
        </Grid>
      </Grid>
    </Router>
  )
}

export default App
