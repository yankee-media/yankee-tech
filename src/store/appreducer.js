import * as types from './actiontypes';

export const appReducerInit = {
  latestVideos: [],
  allVideos: [],
  searchResults: [],
  drawerOpen: false,
  dialogOpen: false,
  dialogTitle: null,
  dialogComponent: null,
  dialogWidth: 'sm',
  signUpError: null,
  loginError: null,
  signUpOrLoginPending: false,
  socialMediaSignUpOrLoginPending: false,
  searchHitNum: null,
  searchPageNum: null
}

const appReducer = (state = appReducerInit, action) => {
  switch (action.type) {
    case types.UPDATE_LATEST_VIDEOS:
      return {
        ...state,
        latestVideos: action.videos
      }
    case types.UPDATE_ALL_VIDEOS:
      return {
        ...state,
        allVideos: action.videos
      }
    case types.UPDATE_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.hits,
        searchHitNum: action.nbHits,
        searchPageNum: action.nbPages
      }
    case types.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: action.value
      }
    case types.TOGGLE_DIALOG:
      return {
        ...state,
        dialogOpen: action.value,
        dialogComponent: action.component,
        dialogTitle: action.title,
        dialogWidth: action.maxWidth,
        signUpError: null,
        loginError: null
      }
    case types.SET_SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.error
      }
    case types.SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.error
      }
    case types.SET_SIGNUP_OR_LOGIN_PENDING:
      return {
        ...state,
        signUpOrLoginPending: action.value
      }
    case types.SET_SOCIAL_MEDIA_SIGNUP_OR_LOGIN_PENDING:
        return {
          ...state,
          socialMediaSignUpOrLoginPending: action.value
        }
    default:
      return state
  }
}

export default appReducer;