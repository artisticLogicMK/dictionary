import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react'

const BookmarkHeader = ({ children, title }) => {
  return (
    <IonHeader>
      <IonToolbar className="border-b dark:border-white/10">
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        
        <IonTitle className="opacity-75">{title}</IonTitle>
        
        {children}
      </IonToolbar>
    </IonHeader>
  )
}

export default BookmarkHeader