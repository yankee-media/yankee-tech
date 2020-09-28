import React from 'react';

// Router
import { Route, Redirect, withRouter } from 'react-router-dom';

// Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isEmpty, isLoaded } from 'react-redux-firebase';

// Custom Components
import Loading from './Loading';


const ProtectedRoute = ({auth, ...props}) => {
  if (!isLoaded(auth)) {
    return <Route {...props} render={() => <Loading absolute />} />
  } else if (isEmpty(auth)) {
    return <Redirect to='/' />
  } else {
    return <Route {...props} />
  }
}

const mapStateToProps = ({ firebase }) => {
  return {
    auth: firebase.auth
  }
}

const mapDispatchToProps = dispatch => ({});

export default compose(withFirebase, withRouter, connect(mapStateToProps, mapDispatchToProps))(ProtectedRoute);