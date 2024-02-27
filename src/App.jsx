import { useEffect, useState } from 'react'
import { isPlatform } from '@ionic/react'
import { StatusBar, Style } from '@capacitor/status-bar'
import { Redirect, Route } from 'react-router-dom'
import { IonReactRouter } from '@ionic/react-router'
import GlobalContext from './components/GlobalContext'

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react'
import {
  bookOutline, timerOutline, bookmarksOutline, wifiOutline
} from 'ionicons/icons'

import Dictionary from './pages/Dictionary'
import Bookmarks from './pages/Bookmarks'
import WordResult from './pages/WordResult'
import History from './pages/History'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import './theme/style.css'

/* Theme variables */
import './theme/variables.css'

setupIonicReact({
  mode: 'ios',
  hardwareBackButton: true
})

const App = () => {
  const [online, setOnline] = useState(true)
  
  useEffect(() => {
    const setStatusBarColor = async () => {
      if (isPlatform('android')) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          // Dark mode
          await StatusBar.setBackgroundColor({ color: '#212121' }) // Set dark color
          await StatusBar.setStyle({ style: Style.Dark }) // Set light text color
        } else {
          // Light mode
          await StatusBar.setBackgroundColor({ color: '#FAFAFA' }) // Set light color
          await StatusBar.setStyle({ style: Style.Light }) // Set dark text color
        }
      }
    }
  
    const updateStatusBarColor = async () => {
      if (isPlatform('android')) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
          await setStatusBarColor()
        })
  
        await setStatusBarColor() // Initial setting
      }
    }
  
    if (window.Capacitor && isPlatform('android')) {
      // For Capacitor apps on Android
      if (window.Capacitor.isNative) {
        // For native apps
        updateStatusBarColor()
      }
    }
    
    // check for network availability
    setInterval(() => {
      if (!navigator.onLine) {
        setOnline(false)
      } else {
        setOnline(true)
      }
    }, 1000)
  
    return () => {
      // Clean up event listener
      if (isPlatform('android')) {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', updateStatusBarColor)
      }
    }
  }, [])

  return (
    <GlobalContext>
      <IonApp>
        <IonReactRouter>
        
          <IonTabs>
          
            <IonRouterOutlet>
              <Route exact path="/dictionary" component={Dictionary} />
              <Route exact path="/dictionary/:word" component={WordResult} />
              
              <Route exact path="/bookmarks" component={Bookmarks} />
              <Route exact path="/history" component={History} />
              <Redirect exact from="/" to="/dictionary" />
            </IonRouterOutlet>
            
            
            <IonTabBar
              slot="bottom"
              className="p-2 border-t dark:border-white/10"
            >
              <IonTabButton tab="tab1" href="/dictionary">
                <IonIcon aria-hidden="true" icon={bookOutline} />
                <IonLabel>Dictionary</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="tab3" href="/bookmarks">
                <IonIcon aria-hidden="true" icon={bookmarksOutline} />
                <IonLabel>Bookmarks</IonLabel>
              </IonTabButton>
              
              <IonTabButton tab="tab2" href="/history">
                <IonIcon aria-hidden="true" icon={timerOutline} />
                <IonLabel>History</IonLabel>
              </IonTabButton>
            </IonTabBar>
            
          </IonTabs>
          
        </IonReactRouter>
      </IonApp>
      
      {!online &&
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white/90 dark:bg-black/90">
          <IonIcon icon={wifiOutline} className="text-7xl opacity-25" />
          <p className="text-sm opacity-75">Please check cellular data or wifi...</p>
        </div>
      }
    </GlobalContext>
  )
}

export default App
