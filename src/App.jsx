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
} from '@ionic/react';
import {
  ellipse, square, triangle, bookOutline, timerOutline, bookmarksOutline, settingsOutline
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

//import './js/tailwind.js'

import './theme/style.css'

/* Theme variables */
import './theme/variables.css'

setupIonicReact({
  mode: 'ios',
  hardwareBackButton: true
})

const App = () => (
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
  </GlobalContext>
)

export default App
