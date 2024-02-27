import { IonProgressBar } from '@ionic/react'

const ProgressBar = ({ loading }) => {
  return (
    <div className="w-full h-[3px]">
      {loading && 
        <IonProgressBar type="indeterminate"></IonProgressBar>
      }
    </div>
  )
}

export default ProgressBar