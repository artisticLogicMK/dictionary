import { useState, useEffect } from 'react'
import storage from '../lib/storage'

import { IonContent, IonPage, IonIcon, IonHeader, IonToolbar, IonButtons, IonButton, useIonViewDidEnter } from '@ionic/react'
import {
  bookmarkOutline, volumeHighOutline
} from 'ionicons/icons'
import Header from '../components/Header'
import NavMenu from '../components/NavMenu'
import WordFind from '../components/WordFind'
import ProgressBar from '../components/ProgressBar'
import NotFound from '../components/NotFound'

const WordResult = ({ match }) => {
  // Destructuring values from the global context
  const [loader, setLoader] = useState(false)
  
  const [word, setWord] = useState(null)
  const [etymology, toggleEtymology] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [notFound, setNotFound] = useState(false)


  useEffect(() => {
    (async () => {
      setLoader(true)
      
      const req = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+match.params.word)
      const res = await req.json()
      const firstRes = res[0]
      
      // if word isnt found
      let notFoundRes = res.title ? true : false
      
      let searchWord, definitions, partOfSpeech, phonetic, phonetics
      
      const constructWord = () => {
        // set result to state
        setWord({
          word: searchWord,
          definitions: definitions,
          partOfSpeech: partOfSpeech,
          phonetic: phonetic,
          phonetics: phonetics && phonetics.length ? phonetics : null
        })
      }
      
      if (!notFoundRes) {
        // streamline needed data
        searchWord = firstRes.word
        definitions = firstRes.meanings[0].definitions.slice(0, 10)
        partOfSpeech = firstRes.meanings[0].partOfSpeech
        phonetic = firstRes.phonetic
        phonetics = firstRes.phonetics.length ? firstRes.phonetics.filter(obj => obj.audio.length) : null
        
        constructWord()
      }
      else {
        // if word not found, use wordnik api
        const apiKey = '05i5fqya8zwpze0b2si8i81za1e7c49gqat3dk8vvj6x0611f'
        
        // fetch definitions
        const dReq = await fetch('https://api.wordnik.com/v4/word.json/'+match.params.word+'/definitions?limit=10&includeRelated=false&useCanonical=false&includeTags=false&api_key='+apiKey)
        const dRes = await dReq.json()
        
        if (dRes.error) {
          setNotFound(true)
          setLoader(false)
        }
        else {
          // create an [] of objs containing each meaning and example
          definitions = dRes.map(obj => ({
            definition: obj.text,
            example: obj.exampleUses.length ? obj.exampleUses[0].text : null
          }))
          
          searchWord = dRes[0].word
          partOfSpeech = dRes.filter(o => o.partOfSpeech)[0].partOfSpeech
          
          
          // fetch pronounciations (audio)
          const pReq = await fetch('https://api.wordnik.com/v4/word.json/'+match.params.word+'/audio?useCanonical=false&limit=10&api_key='+apiKey)
          const pRes = await pReq.json()
          phonetics = pRes.error || pRes.length < 1 ? null : pRes.map(obj => ({aidio: obj.fileUrl || null }))
          
          
           // fetch phonetic
          const phReq = await fetch('https://api.wordnik.com/v4/word.json/'+match.params.word+'/pronunciations?useCanonical=false&limit=5&api_key='+apiKey)
          const phRes = await phReq.json()
          
          if (!phRes.error && phRes.length > 0) {
            const wiki = phRes.filter(_ => _.attributionText.startsWith('from Wiki'))
            phonetic = '/'+(wiki.length ? wiki[0].raw : phRes[0].raw)+'/'
          }
          
          constructWord()
        }
      }
      
      setLoader(false)
    })()
  }, [])
  
  useIonViewDidEnter(async () => {
    // check if word is setBookmarked
    const bookmarks = await storage.get('bookmarks')
    const isBookmarked = bookmarks.some(obj => obj.word === match.params.word)
    
    // if exist, lightup bookmark icon
    if (bookmarks && isBookmarked) {
      setBookmarked(true)
    } else { // unlight bookmark icon
      setBookmarked(false)
    }
  })
  

  const pronounceWord = (data) => {
    if (!data || data.length < 1) return
    
    // play phonetic of word
    const url = data[0].audio // get url of first data
    const audio = new Audio(url) // create audio obj

    // Play the audio
    audio.play()
  }
  
  const saveBookmark = async (_word) => {
    let bookmarks = await storage.get('bookmarks')
    
    // initialize to [] if bookmarks not in storage
    if (!bookmarks) bookmarks = []

    // if word exist
    if (bookmarks.some(obj => obj.word === _word)) {
      // filter out from bookmarks array
      bookmarks = bookmarks.filter(obj => obj.word !== _word)
      setBookmarked(false) // unlight bookmark icon
    }
    else {
      // word doesnt exist, add to array
      bookmarks.unshift({
        word: _word,
        time: Date.now()
      })
      
      // lightup bookmark icon
      setBookmarked(true)
    }
    
    // save modified bookmarks array
    await storage.set('bookmarks', bookmarks)
  }
  
  const stripTags = (input) => {
    var doc = new DOMParser().parseFromString(input, 'text/html')
    return doc.body.textContent || ""
  }
  
  return (
    <>
      <IonPage id="main-content">
        <Header title="xDictionary" word={match.params.word} />
        
        
        {word && !notFound &&
          <IonHeader translucent={true}>
            <IonToolbar className="border-b dark:border-white/10">
              <div className="text-base opacity-80 ml-2">
                {word?.word}
              </div>
              
              {word.phonetics &&
                <IonButtons slot="end">
                  <IonButton
                    onClick={() => pronounceWord(word.phonetics)}
                    className="scale-[1.15]"
                  >
                    <IonIcon icon={volumeHighOutline} slot="icon-only"></IonIcon>
                  </IonButton>
                </IonButtons>
              }
              
              <IonButtons slot="end">
                <IonButton onClick={() => saveBookmark(word.word)}>
                  <IonIcon icon={bookmarkOutline} slot="icon-only" className={bookmarked && 'text-yellow-400'}></IonIcon>
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        }

        
        <IonContent fullscreen>
          
          <ProgressBar loading={loader} />
          
          {notFound && !word &&
            <NotFound word={match.params.word} />
          }
        
          
          {word && !notFound &&
            <div className="resulttexts p-5 pb-10">
            
            {word.phonetic &&
              <div className="border-b dark:border-white/10 pb-3 mb-3">
                <p className="text-base font-semibold mb-0.5">Pronunciation</p>
                <p className="text-sm ml-5">{word.phonetic}</p>
                
                <p
                  className="text-base font-semibold mt-4 hidden"
                  onClick={() => toggleEtymology(!etymology)}
                >
                  Etymology 
                  <span
                    dangerouslySetInnerHTML={{ __html: etymology ? '&#x25B2;' : '&#x25BC;' }}
                    className="ml-1 text-[#3880ff]"
                  />
                </p>
                
                {etymology && <p className="text-sm mt-0.5 hidden">early 19th century: variant of earlier hollo ; related to holla.</p>}
              </div>
            }
              
              <div className="border-b dark:border-white/10 pb-3">
                {word.partOfSpeech &&
                  <IonButton size="small" fill="outline" color="medium" className="pointer-events-none mb-3">
                    {word.partOfSpeech}
                  </IonButton>
                }
                
                <p className="text-sm font-semibold mb-0.5">{word.word}</p>
              
                {word.definitions.map((def, i) => (
                  <div key={i} className="mt-2">
                    <p className="text-sm ml-5 mb-0.5">
                      {i+1}.&nbsp; {stripTags(def.definition)}
                    </p>

                    {def.example &&
                      <p className="text-sm ml-10">
                        &#x2022; {stripTags(def.example)}
                      </p>
                    }
                  </div>
                ))}
              </div>
              
    
              <WordFind word={word.word} />
              
            </div>
          }
        </IonContent>
        
      </IonPage>
  
      <NavMenu />
    </>
  )
}

export default WordResult
