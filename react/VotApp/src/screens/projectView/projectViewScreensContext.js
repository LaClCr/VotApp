import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [selectedProject , setSelectedProject] = useState(null);
  const [nieValoration , setNieValoration] = useState('');
  const [projectName, setProjectName] = useState('');

  return (
    <ScreensContext.Provider value={{ selectedProject , setSelectedProject, nieValoration, setNieValoration, projectName, setProjectName }}>
      {children}
    </ScreensContext.Provider>
  );
};
export default ScreensContext;