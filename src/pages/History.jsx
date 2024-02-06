import { useState } from 'react'

import { IonContent, IonPage, IonRouterLink, IonList, IonItem, IonButtons, IonButton, IonIcon, IonRadioGroup, IonRadio } from '@ionic/react'
import { closeOutline, bookmarkOutline, bookmark } from 'ionicons/icons'
import NavMenu from '../components/NavMenu'
import BookmarkHeader from '../components/BookmarkHeader'
import Filter from '../components/Filter'

const History = () => {
  const [filter, setFilter] = useState('chrono')
  
  const changeFilter = (type) => {
    setFilter(type)
  }
  
  const handleClick = (e) => {
    if (e.target.id === 'btn') {
      e.preventDefault()
      alert(677)
    }
  }
  
  return (
    <>
      <IonPage id="main-content">
        <BookmarkHeader title="History">
          <Filter>
            <IonList lines="full">
              <IonRadioGroup
                value={filter}
                onIonChange={(e) => changeFilter(e.detail.value)}
              >
                <IonItem>
                  <IonRadio value="alphabet">Alphabetical Order</IonRadio>
                </IonItem>
                
                <IonItem>
                  <IonRadio value="chrono">Chronological Order</IonRadio>
                </IonItem>
              </IonRadioGroup>
            </IonList>
          </Filter>
        </BookmarkHeader>
      
      
        <IonContent fullscreen>
          <div className="px-4 pb-6">
            {[1,2, 3].map((d, i) => (
              <IonRouterLink routerLink={'/dictionary'} color="dark" onClick={handleClick}>
                <div key={i} className="flex justify-between items-center py-2 border-b dark:border-white/10 active:bg-black/5 dark:active:bg-white/10">
                  <div>
                    <p className="text-base">interstellar</p>
                    <p className="text-sm opacity-60">1st March, 2924</p>
                  </div>
                  
                  <div className="flex -right-3 relative">
                    <IonButtons>
                      <IonButton id="btn">
                        <IonIcon icon={bookmarkOutline} slot="icon-only" className="text-[#3880ff] scale-[.85]"></IonIcon>
                        <IonIcon icon={bookmark} slot="icon-only" className="text-yellow-400 scale-[.85] hidden"></IonIcon>
                      </IonButton>
                      
                      <IonButton id="btn">
                        <IonIcon icon={closeOutline} slot="icon-only" className="text-[#3880ff] mr-6"></IonIcon>
                      </IonButton>
                    </IonButtons>
                  </div>
                </div>
              </IonRouterLink>
            ))}
            
          </div>
        </IonContent>
        
      </IonPage>
      
      <NavMenu />
    </>
  )
}

export default History
