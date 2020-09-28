import React, { useState } from 'react';

// Util
import { BACKGROUND_COLOR, MAIN_LOGO, AUTHENTICATED, NOT_AUTHENTICATED, AUTH_INIT } from '../util/constants';
import { navButtons } from '../util/elements';
import { getAuthState } from '../util/helpers';
import { withFirebase } from 'react-redux-firebase';
import { compose } from 'redux';

// Router
import { Link, withRouter } from 'react-router-dom';

// Icons
import Menu from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Settings from '@material-ui/icons/Settings';
import ExitToApp from '@material-ui/icons/ExitToApp';

// UI Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

// Custom Components
import Signup from './auth/Signup';
import Login from './auth/Login';

const Header = ({ openDrawer, openDialog, history, auth, firebase }) => {
  const [menuAnchor, setMenuAnchorEl] = useState(null);
  const handleMenuClick = e => {
    setMenuAnchorEl(e.currentTarget);
  }
  const closeMenu = () => {
    setMenuAnchorEl(null);
  }
  const authMap = new Map([
    [AUTHENTICATED, (
      <React.Fragment>
        <Button style={{ height: '100%' }} onClick={handleMenuClick}>
          <AccountCircle />
          <ArrowDropDown />
        </Button>
        <Popper
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
            >
              <Paper>
                <ClickAwayListener onClickAway={closeMenu}>
                  <MenuList autoFocusItem={Boolean(menuAnchor)}>
                    <MenuItem onClick={() => {
                      history.push('/account-settings');
                      closeMenu();
                      }}><Settings />&nbsp;&nbsp;&nbsp;Account Settings</MenuItem>
                    <MenuItem onClick={() => {
                      firebase.logout()
                      closeMenu()
                    }}><ExitToApp />&nbsp;&nbsp;&nbsp;Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </React.Fragment>
    )],
    [NOT_AUTHENTICATED, (
      <React.Fragment>
        <Button fullWidth color='primary' variant='contained' size='small' onClick={() => openDialog(<Login />, 'Login:', 'sm')}>Login</Button>
        <Button fullWidth color='secondary' variant='contained' size='small' onClick={() => openDialog(<Signup />, 'Create Your Account:', 'sm')} style={{ marginTop: '4px' }}>Signup</Button>
      </React.Fragment>)],
    [AUTH_INIT, <CircularProgress />]
  ]);
  return (
    <AppBar position='relative' style={{ backgroundColor: BACKGROUND_COLOR }}>
      <Toolbar style={{ height: '75px' }}>
        <div id='desktop-header' style={{ margin: '5px auto', maxWidth: '1230px', width: '100%', padding: '0 15px' }}>
          <Link to='/'><div style={{ width: '190px', marginRight: '10px', display: 'inline-block' }}><div style={{ width: '180px' }}><img style={{ height: '60px' }} src={MAIN_LOGO} alt='main logo' /></div></div></Link>
          {navButtons.map(({ link, title, Icon }) => (
            <React.Fragment key={title}>
              <span style={{ flex: 1 }}></span>
              <Link style={{height: '65px', display: 'inline-block'}} to={link}><Button style={{ width: '100%', height: '100%' }}><Icon color='primary' style={{ marginRight: '10px', position: 'relative', top: '-2px' }} />{title}</Button></Link>
            </React.Fragment>
          ))}
          <span style={{ flex: 1 }}></span>
          <div style={{ width: '80px' }}>
            {authMap.get(getAuthState(auth))}
          </div>
        </div>
        <div id='mobile-header' style={{ margin: '5px auto', maxWidth: '1230px', width: '100%', padding: '0 15px' }}>
          <Link to='/'><div style={{ width: '190px', marginRight: '10px', display: 'inline-block' }}><div style={{ width: '180px' }}><img style={{ height: '60px' }} src={MAIN_LOGO} alt='main logo' /></div></div></Link>
          <span style={{ flex: 1 }}></span>
          <IconButton onClick={openDrawer} style={{ height: '48px', marginTop: '8.5px' }}><Menu color='primary' /></IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default compose(withRouter, withFirebase)(Header);