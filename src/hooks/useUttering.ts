import { useState } from 'react'
import { utterText } from '../utils/utterText'

export const useUttering = () => {
  const [isUttering, setIsUttering] = useState(false)

  const startUttering = (text: string | undefined) => {
    if (!text) return
    // Cancel any ongoing utterance before starting a new one
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel()
    }

    const { utterance } = utterText(text)

    console.log(utterance)

    setIsUttering(true)

    utterance.onend = () => {
      setIsUttering(false)
    }

    utterance.onerror = () => {
      setIsUttering(false)
    }
  }

  const endUttering = () => {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel()
    }
    setIsUttering(false)
  }

  return { isUttering, startUttering, endUttering }
}
