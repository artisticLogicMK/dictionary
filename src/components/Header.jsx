import { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useGlobalContext } from './GlobalContext'

import { IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, IonInput, IonMenuButton } from '@ionic/react'

import {
  searchOutline, chevronBackOutline
} from 'ionicons/icons'

const Header = ({ title }) => {
  // Destructuring values from the global context
  const { currentWord, setCurrentWord } = useGlobalContext()
  
  // State variable to manage whether the word input is active or not
  const [wordInput, setWordInput] = useState(false)
  
  // Ref for the input element
  const input = useRef(null)
  
  // Access to the history object for navigation
  const history = useHistory()
  
  // Access to the location object to check the current pathname
  const location = useLocation()
  
  // Function to fetch the word and navigate to the dictionary page
  const fetchWord = (e) => {
    e.preventDefault()
    
    // Check if the currentWord is not empty and starts with an alphabet
    if (currentWord.length > 0 && /^[a-zA-Z]/.test(currentWord[0])) {
      // navigate to the result page
      history.push('/dictionary/' + currentWord);
    }
  }
  
  // Effect hook to handle the search status when the component mounts
  useEffect(() => {
    // Check if currentWord is not empty and the current pathname is not '/dictionary'
    if (currentWord.length > 0 && location.pathname !== '/dictionary') {
      // Show word input, indicating an active word
      setWordInput(true)
    }
  }, [])
  
  return (
    <IonHeader translucent={true}>
      <IonToolbar
        className="border-b dark:border-white/10"
        style={{ display: wordInput ? 'none' : 'block' }}
      >
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>

        <IonTitle className="opacity-75">{title}</IonTitle>
        
        <IonButtons slot="end">
          <IonButton
            onClick={() => {
              setWordInput(true)
              setTimeout(() => input.current.setFocus(), 200)
            }}
          >
            <IonIcon icon={searchOutline} slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
      </IonToolbar>
      
      <IonToolbar
        className="border-b dark:border-white/10 pr-3"
        style={{ display: wordInput ? 'block' : 'none' }}
      >
        <IonButtons slot="start">
          <IonButton onClick={() => setWordInput(false)}>
            <IonIcon icon={chevronBackOutline} slot="icon-only"></IonIcon>
          </IonButton>
        </IonButtons>
        
        <form onSubmit={fetchWord}>
          <IonInput
            clearInput={true}
            placeholder="Enter the word to search for"
            autocapitalize="off"
            autocomplete="off"
            autocorrect="true"
            className="ml-2 input"
            value={currentWord}
            ref={input}
            onIonInput={(e) => setCurrentWord(e.target.value)}
            onIonBlur={() => setWordInput(false)}
          ></IonInput>
        </form>
      </IonToolbar>
    </IonHeader>  
  )
}

export default Header