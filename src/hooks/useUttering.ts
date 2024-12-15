import { useState } from 'react'
import { utterText } from '../utils/utterText'

export const useUttering = () => {
  const [isUttering, setIsUttering] = useState(false)

  // Check if the speechSynthesis API is supported by the browser
  const isSpeechSynthesisSupported = 'speechSynthesis' in window

  if (!isSpeechSynthesisSupported) {
    console.error('SpeechSynthesis API is not supported in this browser')
  }

  const startUttering = (text: string | undefined) => {
    if (!text || !isSpeechSynthesisSupported) return

    // Cancel any ongoing utterance before starting a new one
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel()
    }

    const { utterance } = utterText(text)

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

  return { isUttering, startUttering, endUttering, isSpeechSynthesisSupported }
}
