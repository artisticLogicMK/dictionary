import { useState } from 'react'

import { IonContent, IonPage, IonIcon, IonHeader, IonToolbar, IonButtons, IonButton, IonRouterLink } from '@ionic/react'
import {
  bookmarkOutline, volumeHighOutline, bookmark
} from 'ionicons/icons'
import Header from '../components/Header'
import NavMenu from '../components/NavMenu'

const WordResult = ({ match }) => {
  const [etymology, toggleEtymology] = useState(false)
  
  return (
    <>
      <IonPage id="main-content">
        <Header title="Dictionary" word={match.params.word} />
        
        <IonHeader translucent={true}>
          <IonToolbar className="border-b dark:border-white/10">
            <div className="text-base opacity-80 ml-2">
              {match.params.word}
            </div>
            
            <IonButtons slot="end">
              <IonButton className="scale-[1.15]">
                <IonIcon icon={volumeHighOutline} slot="icon-only"></IonIcon>
              </IonButton>
            </IonButtons>
            
            <IonButtons slot="end">
              <IonButton>
                <IonIcon icon={bookmarkOutline} slot="icon-only"></IonIcon>
                <IonIcon icon={bookmark} slot="icon-only" className="text-yellow-400 hidden"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        
        <IonContent fullscreen>
          
          <div className="resulttexts p-5 pb-10">
          
            <div className="border-b dark:border-white/10 pb-3">
              <p className="text-base font-semibold mb-0.5">Pronounciation</p>
              <p className="text-sm ml-5">/erimaet/</p>
              
              <p
                className="text-base font-semibold mt-4"
                onClick={() => toggleEtymology(!etymology)}
              >
                Etymology 
                <span
                  dangerouslySetInnerHTML={{ __html: etymology ? '&#x25B2;' : '&#x25BC;' }}
                  className="ml-1 text-[#3880ff]"
                />
              </p>
              {etymology && <p className="text-sm mt-0.5">early 19th century: variant of earlier hollo ; related to holla.</p>}
            </div>
            
            <div className="border-b dark:border-white/10 py-3">
              <IonButton size="small" fill="outline" color="medium" className="pointer-events-none">Noun</IonButton>
              
              <p className="text-sm font-semibold mb-0.5 mt-3">beat</p>
            
              {[1,2].map((h, i) => (
                <div key={i} className="mt-2">
                  <p className="text-sm ml-5 mb-0.5">{i+1}.&nbsp; A pulse on the beat level, the metric level at which pulses are heard as the basic unit.</p>
                  <p className="text-sm ml-10">&#x2022; a beat of the heart; the beat of the pulse</p>
                </div>
              ))}
            </div>
            
            <div className="py-3">
              <p className="text-base font-semibold mb-0.5">Synonymous in meaning</p>
              <div className="text-[#3880ff] text-[0.93rem]">
                {[1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0].map((n, i) => (
                  <span className="mr-2 whitespace-nowrap">
                    <IonRouterLink routerLink={'jjj'}>indent</IonRouterLink>
                  </span>
                ))}
              </div>
              
              <p className="text-base font-semibold mb-0.5 mt-3">Synonymous in pronounciation</p>
              <div className="text-[#3880ff] text-[0.93rem]">
                {[1,2,3,4,5,67,8,9,0,1,2,3,4,5,6,7,8,9,0].map((n, i) => (
                  <span className="mr-2 whitespace-nowrap">
                    <IonRouterLink routerLink={'jjj'}>indent</IonRouterLink>
                  </span>
                ))}
              </div>
              
              <p className="text-base font-semibold mb-0.5 mt-3">Synonymous in spelling</p>
              <div className="text-[#3880ff] text-[0.93rem]">
                {[1,2,3,4,5,6].map((n, i) => (
                  <span className="mr-2 whitespace-nowrap">
                    <IonRouterLink routerLink={'hj'}>indent</IonRouterLink>
                  </span>
                ))}
              </div>
              
              <p className="text-base font-semibold mb-0.5 mt-3">Described by adjectives</p>
            </div>
            
          </div>
        </IonContent>
        
      </IonPage>
  
      <NavMenu />
    </>
  )
}

export default WordResult
