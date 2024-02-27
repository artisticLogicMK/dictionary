import { useState, useEffect } from 'react'
import storage from '../lib/storage'
import moment from 'moment'

import { IonContent, IonPage, IonRouterLink, IonList, IonItem, IonButtons, IonButton, IonIcon, IonRadioGroup, IonRadio, useIonViewDidEnter } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import NavMenu from '../components/NavMenu'
import BookmarkHeader from '../components/BookmarkHeader'
import Filter from '../components/Filter'

const Bookmarks = () => {
  const [filter, setFilter] = useState('chrono')
  const [bookmarks, setBookmarks] = useState([])
  
  const changeFilter = (type) => {
    setFilter(type)
  }
  
  const handleClick = (e) => {
    if (e.target.id === 'btn') {
      e.preventDefault()
    }
  }
  
  const fetchBookmarks = async () => {
    const _bookmarks = await storage.get('bookmarks')
    
    if (_bookmarks) {
      if (filter === "chrono") {
        // display chronologically
        const sort = _bookmarks.sort((a, b) => b.time - a.time)
        setBookmarks(sort)
      }
      else {
        const sort = _bookmarks.sort((a, b) => a.word.localeCompare(b.word))
        setBookmarks(sort)
      }
    }
  }
  
  const deleteBookmarks = async (time) => {
    let _bookmarks = await storage.get('bookmarks')
    
    // filter out bookmark by time el
    const out = _bookmarks.filter(obj => obj.time !== time)
    
    // save bookmarks storage
    await storage.set('bookmarks', out)
    
    // update list
    fetchBookmarks()
  }
  
  useEffect(() => {
    fetchBookmarks()
  }, [filter])
  
  useIonViewDidEnter(() => {
    fetchBookmarks()
  })
  
  return (
    <>
      <IonPage id="main-content">
        <BookmarkHeader title="Bookmarks">
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
            {bookmarks.length > 0 && bookmarks.map((bk, i) => (
              <IonRouterLink
                key={i}
                routerLink={'/dictionary/'+bk.word}
                color="dark"
                onClick={handleClick}
              >
                <div className="flex justify-between items-center pl-4 pr-1 py-2 border-b dark:border-white/10 active:bg-black/5 dark:active:bg-white/10">
                  <div>
                    <p className="text-base mb-1">
                      {bk.word}
                    </p>
                    <p className="text-sm opacity-60">
                      {moment(bk.time).format('D MMM, YYYY HH:mm a')}
                    </p>
                  </div>
  
                  <IonButtons>
                    <IonButton id="btn" onClick={() => deleteBookmarks(bk.time)}>
                      <IonIcon icon={closeOutline} slot="icon-only" className="text-[#3880ff]"></IonIcon>
                    </IonButton>
                  </IonButtons>
                </div>
              </IonRouterLink>
            ))}
            
            {bookmarks.length < 1 &&
              <div className="opacity-50 mt-16 text-center text-4xl">....</div>
            }
          </div>
        </IonContent>
        
      </IonPage>
      
      <NavMenu />
    </>
  )
}

export default Bookmarks
