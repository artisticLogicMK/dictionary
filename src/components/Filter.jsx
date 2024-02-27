import { useRef, useState } from 'react'

import { IonContent, IonPopover, IonButtons, IonButton, IonIcon } from '@ionic/react'
import { filterOutline } from 'ionicons/icons'

const Filter = ({ children }) => {
  const popover = useRef(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  
  const openPopover = (e) => {
    popover.current.event = e
    setPopoverOpen(true)
  }
  
  return (
    <>
      <IonButtons slot="end">
        <IonButton onClick={openPopover}>
          <IonIcon icon={filterOutline} slot="icon-only"></IonIcon>
        </IonButton>
      </IonButtons>
      
      <IonPopover
        ref={popover}
        isOpen={popoverOpen}
        onDidDismiss={() => setPopoverOpen(false)}
        dismissOnSelect="true"
      >
        <IonContent>
          {children}
        </IonContent>
      </IonPopover>
    </>
  )
}

export default Filter