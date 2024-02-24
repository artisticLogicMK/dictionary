import storage from '../lib/storage'

// function to add history to storage
const saveHistory = async (wordData) => {
  let _history = await storage.get('history')
  
  if (!_history) { // if not set
    _history = []
  }
  
  // if last saved word is thesame, stop operation
  if (_history && _history[0].word === wordData.word) return
  
  // store data to array
  _history.unshift(wordData)

  // then store
  await storage.set('history', _history)
}

export default saveHistory