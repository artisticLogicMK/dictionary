import { createContext, useState, useContext } from 'react'
import saveHistory from '../lib/saveHistory'
import storage from '../lib/storage'
import moment from 'moment'

// define global contex 
const Context = createContext()

const GlobalContext = ({ children }) => {
  const [currentWord, setCurrentWord] = useState('')
  const [fromSearch, setFromSearch] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchWord = async () => {
    const req = await fetch('https://api.wordnik.com/v4/words.json/randomWord?api_key=05i5fqya8zwpze0b2si8i81za1e7c49gqat3dk8vvj6x0611f')
    return req.json()
  }

  const getRandomWord = async (history) => {
    setLoading(true)

    const word = await fetchWord()

    if (!word.word) {
      setLoading(false)
      return
    }

    // store word in history storage
    saveHistory({
      word: word.word,
      time: Date.now()
    })

    setLoading(false)

    // go to result page
    history.push('/dictionary/' + word.word.toLowerCase())
  }


  const getWordOfDay = async (history) => {
    let wordOfDay = await storage.get('wordOfDay')
    const today = moment().format('DD-MM-YYYY')

    if (wordOfDay && wordOfDay.date === today) {
      // store word in history storage
      saveHistory({
        word: wordOfDay.word,
        time: Date.now()
      })

      // go to result page
      history.push('/dictionary/' + wordOfDay.word.toLowerCase())
    }
    else {
      setLoading(true)

      const word = await fetchWord()

      if (!word.word) {
        setLoading(false)
        return
      }

      await storage.set('wordOfDay', {
        word: word.word,
        date: today
      })

      // store word in history storage
      saveHistory({
        word: word.word,
        time: Date.now()
      })

      setLoading(false)

      // go to result page
      history.push('/dictionary/' + word.word.toLowerCase())
    }
  }

  return (
    <Context.Provider
      value={{
        currentWord, setCurrentWord, fromSearch, setFromSearch, getRandomWord, getWordOfDay, loading, setLoading
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default GlobalContext
export const useGlobalContext = () => useContext(Context)