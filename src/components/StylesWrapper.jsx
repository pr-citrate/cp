import cssModule from '../utils/cssModule';
import { createContext } from 'react';

export const stylesContext = createContext({ styles: '' });

function StylesWrapper({ styles, children }) {
  return (
    <stylesContext.Provider value={cssModule(styles)}>
      {children}
    </stylesContext.Provider>
  );
}
export default StylesWrapper;
