import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let recognition: any = null

if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.lang = 'en-US'
}

export const useSpeechRecogniction = () => {
  const [text, setText] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [errorOccurred, setErrorOccurred] = useState(false)

  useEffect(() => {
    if (!recognition) return

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      console.log('event', e)
      setText(e.results[0][0].transcript)
      recognition.stop()
      setIsRecording(false)
    }

    recognition.onerror = (e: SpeechRecognitionEvent) => {
      console.log('event', e)
      recognition.stop()
      setIsRecording(false)
      setErrorOccurred(true)
    }
  }, [])

  const startRecording = () => {
    setText('')
    setIsRecording(true)
    recognition.start()
  }

  const stopRecording = () => {
    setIsRecording(false)
    recognition.stop()
  }

  return {
    text,
    isRecording,
    errorOccurred,
    hasRecognitionSupport: !!recognition,
    startRecording,
    stopRecording
  }
}
