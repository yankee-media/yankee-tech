import React, { useEffect } from 'react';

// Redux
import { connect } from 'react-redux';
import { getLatestVideos, toggleDrawer, toggleDialog } from './store/actions';

// Custom Components
import Header from './components/Header';
import SideDrawer from './components/SideDrawer';
import GeneralPurposeDialog from './components/GeneralPurposeDialog';

// Router
import { Switch } from 'react-router-dom';
import { ROUTES } from './util/routes';

const App = ({
  getLatestVideos,
  drawerOpen,
  closeDrawer,
  openDrawer,
  dialogOpen,
  closeDialog,
  openDialog,
  dialogComponent,
  dialogTitle,
  dialogMaxWidth,
  auth }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production')
      getLatestVideos();
  }, [getLatestVideos]);
  return (
    <div>
      <Header auth={auth} openDrawer={openDrawer} openDialog={openDialog} />
      <Switch>
        {ROUTES.map(({props, Route}) => <Route key={props.path} {...props} />)}
      </Switch>
      <SideDrawer auth={auth} dialogOpen={dialogOpen} closeDrawer={closeDrawer} drawerOpen={drawerOpen} openDialog={openDialog} />
      <GeneralPurposeDialog dialogOpen={dialogOpen} closeDialog={closeDialog} component={dialogComponent} maxWidth={dialogMaxWidth} title={dialogTitle} />
    </div>
  );
}

const mapStateToProps = ({ appReducer, firebase }) => {
  return {
    auth: firebase.auth,
    drawerOpen: appReducer.drawerOpen,
    dialogOpen: appReducer.dialogOpen,
    dialogComponent: appReducer.dialogComponent,
    dialogTitle: appReducer.dialogTitle,
    dialogMaxWidth: appReducer.dialogMaxWidth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLatestVideos: () => dispatch(getLatestVideos()),
    closeDrawer: () => dispatch(toggleDrawer(false)),
    openDrawer: () => dispatch(toggleDrawer(true)),
    closeDialog: () => dispatch(toggleDialog(false, null)),
    openDialog: (component, title, maxWidth) => dispatch(toggleDialog(true, component, title, maxWidth))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
