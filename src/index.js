import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Router
import { BrowserRouter as Router } from 'react-router-dom';

// Theme
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import CssBaseline from '@material-ui/core/CssBaseline';

// Redux
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { configureStore } from './store';

// Util
import { SECONDARY_THEME_COLOR, ERROR_COLOR, SECONDARY_BACKGROUND_COLOR } from './util/constants';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
    secondary: {
      main: SECONDARY_THEME_COLOR
    },
    error: {
      main: ERROR_COLOR
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: SECONDARY_BACKGROUND_COLOR,
    }
  }
});

const storeAndProps = configureStore();

ReactDOM.render((
  <Provider store={storeAndProps.store}>
    <ReactReduxFirebaseProvider {...storeAndProps.rrfProps}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>
), document.getElementById('root'));
