import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [selectedProject , setSelectedProject] = useState('');

  return (
    <ScreensContext.Provider value={{ selectedProject , setSelectedProject }}>
      {children}
    </ScreensContext.Provider>
  );
};
export default ScreensContext;