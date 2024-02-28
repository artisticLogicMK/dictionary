import { useState, useEffect } from 'react'
import { IonRouterLink } from '@ionic/react'
import saveHistory from '../lib/saveHistory'

import { IonIcon } from '@ionic/react'
import { refreshOutline } from 'ionicons/icons'

const WordFind = ({ word }) => {
  const [meaningsSyn, setMeaningsSyn] = useState(null)
  const [pronounceSyn, setPronounceSyn] = useState(null)
  const [adjectives, setAdjectives] = useState(null)
  
  useEffect(() => {
    (async () => {
      // fetch words similar in meaning
      const ms = await fetch('https://api.datamuse.com/words?ml='+word)
      const meaningSynonyms = await ms.json()
      const msFilter = meaningSynonyms.slice(0, 30).filter(w => !w.word.includes(' '))
      setMeaningsSyn(msFilter)
      
      // fetch words similar in pronounciation
      const ps = await fetch('https://api.datamuse.com/words?sl='+word)
      const pronounceSynonyms = await ps.json()
      const psFilter = pronounceSynonyms.slice(0, 30).filter(w => !w.word.includes(' '))
      setPronounceSyn(psFilter)
      
      // fetch adjectives that describe word
      const adj = await fetch('https://api.datamuse.com/words?rel_jjb='+word)
      const adjectives = await adj.json()
      const adjFilter = adjectives.slice(0, 30).filter(w => !w.word.includes(' '))
      setAdjectives(adjFilter)
    })()
  }, [])
  
  return (
    <div className="py-3">
      {!meaningsSyn &&
        <div className='text-center py-1'>
          <IonIcon icon={refreshOutline} size="small" className='animate-spin'></IonIcon>
        </div>
      }

      {meaningsSyn !== null && meaningsSyn.length > 0 && (
        <>
          <p className="text-base font-semibold mb-0.5">Synonymous in meaning</p>
          <div className="text-[#3880ff] text-[0.93rem]">
            {meaningsSyn.map((m, i) => (
              <span key={i} className="mr-2 whitespace-nowrap">
                <IonRouterLink
                  onClick={() => saveHistory({word: m.word, time: Date.now()})}
                  routerLink={'/dictionary/'+m.word}
                >
                  {m.word}
                </IonRouterLink>
              </span>
            ))}
          </div>
        </>
      )}


      {pronounceSyn !== null && pronounceSyn.length > 0 && (
        <>
          <p className="text-base font-semibold mb-0.5 mt-3">Synonymous in pronounciation</p>
          <div className="text-[#3880ff] text-[0.93rem]">
            {pronounceSyn.map((p, i) => (
              <span key={i} className="mr-2 whitespace-nowrap">
                <IonRouterLink
                  onClick={() => saveHistory({word: p.word, time: Date.now()})}
                  routerLink={'/dictionary/'+p.word}
                >
                  {p.word}
                </IonRouterLink>
              </span>
            ))}
          </div>
        </>
      )}
      
      
      {adjectives !== null && adjectives.length > 0 && (
        <>
          <p className="text-base font-semibold mb-0.5 mt-3">Described by adjectives</p>
          <div className="text-[#3880ff] text-[0.93rem]">
            {adjectives.map((a, i) => (
              <span key={i} className="mr-2 whitespace-nowrap">
                <IonRouterLink
                  onClick={() => saveHistory({word: a.word, time: Date.now()})}
                  routerLink={'/dictionary/'+a.word}
                >
                  {a.word}
                </IonRouterLink>
              </span>
            ))}
          </div>
        </>
      )}
      
    </div>  
  )
}

export default WordFind