import { useState } from 'react';
import { createContext } from 'react';

export const designContext = createContext();

function DesignWrapper({ design, children }) {
  console.log('design', design);
  const designState = useState(design);
  return (
    <designContext.Provider value={designState}>
      {children}
    </designContext.Provider>
  );
}
export default DesignWrapper;
