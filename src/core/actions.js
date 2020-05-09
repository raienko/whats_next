import * as types from './types';

export const setLanguage = (language) => (dispatch) => {
  return dispatch({type: types.SET_LANGUAGE, payload: {language}});
};

export const setToken = (token) => (dispatch) => {
  return dispatch({type: types.SET_TOKEN, payload: {token}});
};

export const setReady = (ready) => (dispatch) => {
  return dispatch({type: types.SET_READY, payload: {ready}});
};

export const resetState = () => (dispatch) => {
  return dispatch({type: types.RESET_STATE});
};
