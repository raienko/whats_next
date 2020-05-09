import * as types from './types';

export const initialState = {
  language: 'en',
  token: '',
  stories: [],
};

export default (state, action) => {
  switch (action.type) {
    case types.SET_TOKEN:
      return setToken(state, action.payload);
    case types.SET_LANGUAGE:
      return setLanguage(state, action.payload);
    case types.SET_READY:
      return setReady(state, action.payload);
    case types.RESET_STATE:
      return resetState(state, action.payload);
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

const setToken = (state, {token}) => {
  return {
    ...state,
    token,
  };
};

const setLanguage = (state, {language}) => {
  return {
    ...state,
    language,
  };
};

const setReady = (state, {ready}) => {
  return {
    ...state,
    ready,
  };
};

const resetState = (state) => {
  return {
    ...initialState,
  };
};
