import * as types from './actiontypes';
import algoliasearch from 'algoliasearch/lite';
import { ARTICLE_COMMENTS, ARTICLE_COMMENT_COMMENTS } from '../util/constants';
import { isEmpty } from 'react-redux-firebase';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY);
const relevanceIndex = client.initIndex('articles');
const sortByDateIndex = client.initIndex('articles_sort_by_date');

const updateLatestVideos = result => {
  return {
    type: types.UPDATE_LATEST_VIDEOS,
    videos: result
  }
}

const updateAllVideos = result => {
  return {
    type: types.UPDATE_ALL_VIDEOS,
    videos: result
  }
}

export const getLatestVideos = () => {
  return dispatch => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_KEY}&channelId=${process.env.REACT_APP_CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(result => {
        dispatch(updateLatestVideos(result.items || []));
      }).catch(error => {
        console.error(error);
      });
  }
}

export const getAllVideos = () => {
  return dispatch => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_KEY}&channelId=${process.env.REACT_APP_CHANNEL_ID}&part=snippet&type=video&order=date`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(result => {
        dispatch(updateAllVideos(result.items || []));
      }).catch(error => {
        console.error(error);
      });
  }
}

export const toggleDrawer = value => {
  return {
    type: types.TOGGLE_DRAWER,
    value
  }
}

export const toggleDialog = (value, component, title, maxWidth) => {
  return {
    type: types.TOGGLE_DIALOG,
    value,
    component,
    title,
    maxWidth
  }
}

const updateSearchResults = ({ hits, nbHits, nbPages }) => {
  return {
    type: types.UPDATE_SEARCH_RESULTS,
    hits,
    nbHits,
    nbPages
  }
}

const getSearchIndex = params => {
  if (!params) {
    return relevanceIndex.search;
  }
  switch(params.sortBy) {
    case 'recent':
      return sortByDateIndex.search;
    default:
      return relevanceIndex.search;
  }
}

export const executeSearch = (query, params) => {
  return dispatch => {
    const search = getSearchIndex(params);
    search(query, {
      filters: 'active=1'
    }).then(res => {
      dispatch(updateSearchResults(res));
    }).catch(error => {
      console.error(error);
    });
  }
}

const setSignupOrLoginPending = value => {
  return {
    type: types.SET_SIGNUP_OR_LOGIN_PENDING,
    value
  }
}

const setSocialMediaSignupOrLoginPending = value => {
  return {
    type: types.SET_SOCIAL_MEDIA_SIGNUP_OR_LOGIN_PENDING,
    value
  }
}

const getErrorMessage = (code, message) => {
  switch (code) {
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'The email and password combination you entered is incorrect.';
    case 'auth/user-disabled':
      return 'User Disabled';
    case 'auth/account-exists-with-different-credential':
    case 'auth/credential-already-in-use':
    case 'auth/email-already-in-use':
      return 'An account already exists with that email address, please login.';
    case 'auth/auth-domain-config-required':
      return 'Configure Domain';
    case 'auth/operation-not-supported-in-this-environment':
      return 'Operation Not Supported';
    case 'auth/unauthorized-domain':
      return 'Unauthorized Domain';
    case 'auth/operation-not-allowed':
      return 'Operation Not Allowed';
    case 'auth/invalid-email':
      return 'The email address entered is invalid.';
    case 'auth/cancelled-popup-request':
      return 'Popup login failed.';
    case 'auth/popup-blocked':
      return 'Login popup was blocked by popup blocker.';
    case 'auth/popup-closed-by-user':
      return 'Login popup was closed by User.'
    default:
      return message;
  }
}

const signUpError = (code, message) => {
  const error = { type: types.SET_SIGNUP_ERROR };
  error.error = getErrorMessage(code, message);
  return error;
}

const loginError = (code, message) => {
  const error = { type: types.SET_LOGIN_ERROR };
  error.error = getErrorMessage(code, message);
  return error;
}

export const signUp = (email, displayName, password) => {
  return (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch(setSignupOrLoginPending(true));
    firebase.createUser({ email, password }, { email, displayName }).then(res => {
      dispatch(setSignupOrLoginPending(false));
      dispatch(toggleDialog(false, null, 'sm'));
    }).catch(({ code, message }) => {
      dispatch(signUpError(code, message));
      dispatch(setSignupOrLoginPending(false));
    });
  }
}

export const login = (email, password) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch(setSignupOrLoginPending(true));
    firebase.login({ email, password }).then(res => {
      dispatch(setSignupOrLoginPending(false));
      dispatch(toggleDialog(false, null, 'sm'));
    }).catch(({ code, message }) => {
      dispatch(loginError(code, message));
      dispatch(setSignupOrLoginPending(false));
    });
  }
}

export const socialMediaLogin = provider => {
  return (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch(setSocialMediaSignupOrLoginPending(true));
    firebase.login({ provider, type: 'popup' }).then(res => {
      dispatch(setSocialMediaSignupOrLoginPending(false));
      dispatch(toggleDialog(false, null, 'sm'));
    }).catch(({ code, message }) => {
      dispatch(signUpError(code, message));
      dispatch(loginError(code, message));
      dispatch(setSocialMediaSignupOrLoginPending(false));
    });
  }
}

export const postComment = (articleId, comment) => {
  return (_, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const auth = getState().firebase.auth;
    console.log(getState());
    if (!isEmpty(profile)) {
      firestore.collection(ARTICLE_COMMENTS).doc(articleId).collection(ARTICLE_COMMENT_COMMENTS).add({
        author: profile.displayName,
        avatar_url: profile.avatarUrl,
        comment,
        uid: auth.uid
      });
    }
  }
}