import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../components/GlobalContext'

import { IonContent, IonPage, IonIcon } from '@ionic/react'
import {
  calendarOutline, shuffleOutline, book, searchOutline
} from 'ionicons/icons'
import Header from '../components/Header'
import NavMenu from '../components/NavMenu'
import ProgressBar from '../components/ProgressBar'

const Dictionary = () => {
  // Destructuring values from the global context
  const { getRandomWord, getWordOfDay, loading } = useGlobalContext()
  
  const homeItems = [
    {title: "Word of the day", url: "/dictionary", icon: calendarOutline, getWord: getWordOfDay},
    {title: "Random word", url: "/dictionary", icon: shuffleOutline, getWord: getRandomWord}
  ]
  
  // Access to the history object for navigation
  const history = useHistory()
  
  return (
    <>
      <IonPage id="main-content">
        <Header title="xDictionary" />
        
        <IonContent fullscreen>
          <ProgressBar loading={loading} />
        
          <div className="table h-[99%] w-full">
            <div id="home-content" className="table-cell align-middle p-5">
            
              <div className="w-fit h-44 mx-auto relative overflow-hidden">
                <IonIcon icon={book} className="text-[12rem] opacity-5 dark:opacity-10" ></IonIcon>
                <IonIcon icon={searchOutline} className="text-6xl opacity-10 dark:opacity-15 absolute bottom-12 right-3" ></IonIcon>
              </div>
              
              <p className="w-fit mx-auto italic opacity-60 mb-6">
                Search on a word to get started
              </p>
              
              <div className="w-fit mx-auto">
                {homeItems.map((item, i) => (
                  <div
                    key={i}
                    className="inline-flex flex-col items-center justify-center w-28 h-24 bg-black/5 dark:bg-white/[.08] text-black/55 dark:text-white/80 border dark:border-white/15 active:bg-black/10 dark:active:bg-white/15 rounded-2xl mx-1.5 cp"
                    onClick={() => item.getWord(history)}
                  >
                    <IonIcon icon={item.icon} className="text-2xl" ></IonIcon>
                    <div className="font-semibold text-xs mt-1.5">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </IonContent>
        
      </IonPage>
  
      <NavMenu />
    </>
  )
}

export default Dictionary
