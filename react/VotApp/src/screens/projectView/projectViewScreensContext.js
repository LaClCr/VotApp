import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [selectedProject , setSelectedProject] = useState('');
  const [nieValoration , setNieValoration] = useState('');

  return (
    <ScreensContext.Provider value={{ selectedProject , setSelectedProject, nieValoration , setNieValoration }}>
      {children}
    </ScreensContext.Provider>
  );
};
export default ScreensContext;