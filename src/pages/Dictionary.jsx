import { IonContent, IonPage, IonIcon, IonMenu, IonRouterLink, IonList, IonItem, IonLabel, IonMenuToggle } from '@ionic/react'
import {
  calendarOutline, timerOutline, shuffleOutline, book, searchOutline
} from 'ionicons/icons'
import Header from '../components/Header'
import NavMenu from '../components/NavMenu'

const Dictionary = () => {
  const homeItems = [
    {title: "Word of the day", url: "/dictionary", icon: calendarOutline},
    {title: "Random word", url: "/dictionary", icon: shuffleOutline}
  ]
  
  return (
    <>
      <IonPage id="main-content">
        <Header title="Dictionary" />
        
        <IonContent fullscreen>
          <div className="table h-full w-full">
            <div id="home-content" className="table-cell align-middle p-5">
            
              <div className="w-fit h-44 mx-auto relative overflow-hidden">
                <IonIcon icon={book} className="text-[12rem] opacity-5" ></IonIcon>
                <IonIcon icon={searchOutline} className="text-6xl opacity-5 absolute bottom-12 right-3" ></IonIcon>
              </div>
              
              <p className="w-fit mx-auto italic opacity-60 mb-6">
                Search on a word to get started
              </p>
              
              <div className="w-fit mx-auto">
                {homeItems.map((item, i) => (
                  <IonRouterLink key={i} routerLink={item.url}>
                    <div className="inline-flex flex-col items-center justify-center w-28 h-24 bg-neutral-50 dark:bg-white/[.05] text-black/55 dark:text-white/80 border dark:border-white/5 rounded-2xl mx-1.5">
                      <IonIcon icon={item.icon} className="text-2xl" ></IonIcon>
                      <div className="font-semibold text-xs mt-1.5">
                        {item.title}
                      </div>
                    </div>
                  </IonRouterLink>
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
