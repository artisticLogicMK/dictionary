import { IonIcon, IonContent, IonMenu, IonHeader, IonRouterLink, IonList, IonItem, IonLabel, IonMenuToggle, IonToolbar } from '@ionic/react'
import {
  calendarOutline, timerOutline, shuffleOutline, bookmarkOutline
} from 'ionicons/icons'

const NavMenu = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar className="text-lg text-center italic opacity-30 font-semibold">
          Enlyten Dictionary
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonMenuToggle>
          <IonList lines="full">
          
            <IonItem routerLink="/bookmarks/bookmark">
              <IonIcon icon={calendarOutline} slot="start" size="small"></IonIcon>
              <IonLabel>Word of the day</IonLabel>
            </IonItem>
            <IonItem routerLink="/bookmarks/bookmark">
              <IonIcon icon={shuffleOutline} slot="start" size="small"></IonIcon>
              <IonLabel>Random Word</IonLabel>
            </IonItem>
            <IonItem routerLink="/bookmarks/History">
              <IonIcon icon={timerOutline} slot="start" size="small"></IonIcon>
              <IonLabel>History</IonLabel>
            </IonItem>
            <IonItem routerLink="/bookmarks/bookmark">
              <IonIcon icon={bookmarkOutline} slot="start" size="small"></IonIcon>
              <IonLabel>Bookmarks</IonLabel>
            </IonItem>
            
          </IonList>
        </IonMenuToggle>
      </IonContent>

    </IonMenu>  
  )
}

export default NavMenu