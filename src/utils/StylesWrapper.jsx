import { createContext } from 'react';

import cssModule from './cssModule';

export const stylesContext = createContext({ styles: '' });

function StylesWrapper({ styles, children }) {
  return (
    <stylesContext.Provider value={cssModule(styles)}>
      {children}
    </stylesContext.Provider>
  );
}
export default StylesWrapper;
