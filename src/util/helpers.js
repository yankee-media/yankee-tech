import { AUTHENTICATED, NOT_AUTHENTICATED, AUTH_INIT } from './constants';
import { isLoaded, isEmpty } from 'react-redux-firebase';

export const isNumeric = input => {
  return !isNaN(input);
}

export const isNumericOrFloat = inputArray => {
  return inputArray.every(input => isNumeric(input));
}

export const getHTML = __html => ({ __html });


export const getAuthState = auth => {
  if (!isLoaded(auth)) {
    return AUTH_INIT;
  } 
  if (isEmpty(auth)) {
    return NOT_AUTHENTICATED;
  }
  return AUTHENTICATED;
}