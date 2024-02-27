import { useState, useEffect } from 'react'
import storage from '../lib/storage'
import moment from 'moment'

import { IonContent, IonPage, IonRouterLink, IonList, IonItem, IonButtons, IonButton, IonIcon, IonRadioGroup, IonRadio, useIonViewDidEnter } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import NavMenu from '../components/NavMenu'
import BookmarkHeader from '../components/BookmarkHeader'
import Filter from '../components/Filter'

const History = () => {
  const [history, setHistory] = useState([])
  const [filter, setFilter] = useState('chrono')
  
  const changeFilter = (type) => {
    setFilter(type)
  }
  
  const handleClick = (e) => {
    if (e.target.id === 'btn') {
      e.preventDefault()
    }
  }
  
  const fetchHistory = async () => {
    const _history = await storage.get('history')

    if (_history) {
      if (filter === "chrono") {
        // display chronologically
        const sort = _history.sort((a, b) => b.time - a.time)
        setHistory(sort)
      }
      else {
        const sort = _history.sort((a, b) => a.word.localeCompare(b.word))
        setHistory(sort)
      }
    }
  }
  
  const deleteHistory = async (time) => {
    let _history = await storage.get('history')
    
    // filter out bookmark by time el
    const out = _history.filter(obj => obj.time !== time)
    
    // save history storage
    await storage.set('history', out)
    
    // update list
    fetchHistory()
  }
  
  useEffect(() => {
    fetchHistory()
  }, [filter])
  
  useIonViewDidEnter(() => {
    fetchHistory()
  })
  
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
          <div className="pb-6">
            {history && history.map((his, i) => (
              <IonRouterLink
                key={i}
                routerLink={'/dictionary/'+his.word}
                color="dark"
                onClick={handleClick}
              >
                <div key={i} className="flex justify-between items-center pl-4 pr-1 py-2 border-b dark:border-white/10 active:bg-black/5 dark:active:bg-white/10">
                  <div>
                    <p className="text-base mb-1">
                      {his.word}
                    </p>
                    <p className="text-sm opacity-60">
                      {moment(his.time).format('D MMM, YYYY HH:mm a')}
                    </p>
                  </div>
                  
                  <IonButtons>
                    <IonButton id="btn" onClick={() => deleteHistory(his.time)}>
                      <IonIcon icon={closeOutline} slot="icon-only" className="text-[#3880ff]"></IonIcon>
                    </IonButton>
                  </IonButtons>
                </div>
              </IonRouterLink>
            ))}
            
            {history.length < 1 &&
              <div className="opacity-50 mt-16 text-center text-4xl">....</div>
            }
            
          </div>
        </IonContent>
        
      </IonPage>
      
      <NavMenu />
    </>
  )
}

export default History
