import React, {useState} from 'react';
import * as config from 'src/config';

export const PreferencesContext = React.createContext();

export default function Preferences({children}) {
  const [language, changeLanguage] = useState(config.defaultLanguage);

  return (
    <PreferencesContext.Provider value={{language, changeLanguage}}>
      {children}
    </PreferencesContext.Provider>
  );
}
