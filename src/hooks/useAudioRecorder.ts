import { useEffect, useState, useRef } from 'react'
import { convertWebmToMp3 } from '../utils/convertWebmToMp3'

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [mp3Blob, setMp3Blob] = useState<Blob | null>(null)
  const [errorOccurred, setErrorOccurred] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === 'recording'
      ) {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startRecording = async () => {
    setErrorOccurred(false)
    setAudioBlob(null)
    setMp3Blob(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      })
      const options = {
        mimeType: 'audio/webm'
      }
      const rec = new MediaRecorder(stream, options)
      mediaRecorderRef.current = rec

      const chunks: Blob[] = []
      rec.ondataavailable = e => chunks.push(e.data)
      rec.onstop = async () => {
        const blob = new Blob(chunks, { type: rec.mimeType })
        setAudioBlob(blob)

        // Convert to MP3
        try {
          const mp3 = await convertWebmToMp3(blob)
          setMp3Blob(mp3)
          setAudioBlob(mp3)
        } catch (err) {
          console.error('Error converting to MP3:', err)
          setErrorOccurred(true)
        }
      }

      rec.onerror = () => {
        setErrorOccurred(true)
        setIsRecording(false)
      }

      rec.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      setErrorOccurred(true)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }

  return {
    isRecording,
    errorOccurred,
    hasRecordingSupport: !!navigator.mediaDevices && !!window.MediaRecorder,
    audioBlob,
    mp3Blob,
    startRecording,
    stopRecording
  }
}
