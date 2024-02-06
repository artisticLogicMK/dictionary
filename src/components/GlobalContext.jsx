import { createContext, useState, useContext } from 'react' 
  
// define global contex 
const Context = createContext() 
  
const GlobalContext = ({ children }) => {
  const [currentWord, setCurrentWord] = useState('')
 
  return (  
    <Context.Provider
      value={{
        currentWord, setCurrentWord
      }} 
    > 
      {children}
    </Context.Provider> 
  ) 
} 
  
 export default GlobalContext 
 export const useGlobalContext = () => useContext(Context)