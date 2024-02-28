import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../components/GlobalContext'
import moment from 'moment'

import { IonIcon, IonContent, IonMenu, IonHeader, IonList, IonItem, IonLabel, IonMenuToggle, IonToolbar } from '@ionic/react'
import {
  calendarOutline, timerOutline, shuffleOutline, bookmarkOutline
} from 'ionicons/icons'

const NavMenu = () => {
  // Destructuring values from the global context
  const { getRandomWord, getWordOfDay } = useGlobalContext()
  
  // Access to the history object for navigation
  const history = useHistory()
  
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar className="text-base text-center text-[#3880ff] opacity-80 font-semibold">
          xDictionary
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="h-full flex flex-col">
  
          <IonMenuToggle>
            <IonList lines="full" className='cp'>
            
              <IonItem onClick={() => getWordOfDay(history)}>
                <IonIcon icon={calendarOutline} slot="start" size="small"></IonIcon>
                <IonLabel>Word of the day</IonLabel>
              </IonItem>
              
              <IonItem onClick={() => getRandomWord(history)}>
                <IonIcon icon={shuffleOutline} slot="start" size="small"></IonIcon>
                <IonLabel>Random Word</IonLabel>
              </IonItem>
              
              <IonItem routerLink="/history">
                <IonIcon icon={timerOutline} slot="start" size="small"></IonIcon>
                <IonLabel>History</IonLabel>
              </IonItem>
              
              <IonItem routerLink="/bookmarks">
                <IonIcon icon={bookmarkOutline} slot="start" size="small"></IonIcon>
                <IonLabel>Bookmarks</IonLabel>
              </IonItem>
              
            </IonList>
          </IonMenuToggle>
          
          <div className="grow flex items-end p-5">
            <p>&copy;{moment().format('YYYY')} ArtisticMK</p>
          </div>
        
        </div>
      </IonContent>

    </IonMenu>  
  )
}

export default NavMenu