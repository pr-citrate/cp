import { createContext } from 'react';

export const designContext = createContext();

function DesignWrapper({ design, children }) {
  return (
    <designContext.Provider value={design}>{children}</designContext.Provider>
  );
}
export default DesignWrapper;
