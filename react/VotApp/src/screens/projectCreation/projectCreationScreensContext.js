import { createContext, useState } from 'react';
const ScreensContext = createContext();

export const ScreensProvider = ({ children }) => {
  const [selectedDegree , setSelectedDegree] = useState(null);

  return (
    <ScreensContext.Provider value={{ selectedDegree , setSelectedDegree }}>
      {children}
    </ScreensContext.Provider>
  );
};
export default ScreensContext;