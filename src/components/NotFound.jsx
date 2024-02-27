import { IonIcon } from '@ionic/react'
import { sadOutline } from 'ionicons/icons'

const NotFound = ({ word }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[99%] w-full p-3">
      <p className="underline underline-offset-4 text-base opacity-75">{word}</p>
      <IonIcon icon={sadOutline}  className="text-[6rem] opacity-20 my-2"></IonIcon>
      <p className="opacity-55">Not found. Try checking again..</p>
    </div>
  )
}

export default NotFound