import { createContext } from 'react';

import cssModule from './cssModule';

export const stylesContext = createContext({ styles: '' });
export const userStylesContext = createContext({ styles: '' });

function StylesWrapper({ styles, userStyles, children }) {
  return (
    <userStylesContext.Provider value={userStyles}>
      <stylesContext.Provider value={cssModule(styles)}>
        {children}
      </stylesContext.Provider>
    </userStylesContext.Provider>
  );
}
export default StylesWrapper;
