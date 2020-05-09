import React, {useReducer, useEffect} from 'react';
import CoreContext from './context';
import coreService from './service';
import reducer, {initialState} from './reducer';

export default function Core({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    coreService.init({dispatch});
  }, []);

  return (
    <CoreContext.Provider value={state}>
      {children}
    </CoreContext.Provider>
  );
}
