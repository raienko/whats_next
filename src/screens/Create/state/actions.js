import * as types from './types';

export const start = (dispatch) => () => {
  return dispatch({type: types.START});
};

export const updateNode = (dispatch) => (id, changes) => {
  return dispatch({type: types.UPDATE_NODE, payload: {id, changes}});
};

export const createBreakpoint = (dispatch) => () => {
  return dispatch({type: types.CREATE_BREAKPOINT});
};

export const setCurrentNode = (dispatch) => (id) => {
  return dispatch({type: types.SET_CURRENT_NODE, payload: {id}});
};

export const setStatus = (dispatch) => (status) => {
  return dispatch({type: types.SET_STATUS, payload: {status}});
};

export const resetState = (dispatch) => () => {
  return dispatch({type: types.RESET_STATE});
};
