import axios from 'axios'

export const goodTapeService = async (audioBlob: Blob) => {
  if (!audioBlob) return

  const GOOD_TAPE_API_URL = '/api/transcribe/sync'
  const GOOD_TAPE_API_KEY = import.meta.env.VITE_GOOD_TAPE_API_KEY

  const headers = {
    Authorization: GOOD_TAPE_API_KEY,
    'Content-Type': 'multipart/form-data'
  }

  const formData = new FormData()

  formData.append('audio', audioBlob)
  formData.append('languageCode', 'en')
  formData.append('transcriptionId', 'exampleTranscriptionId')

  try {
    const response = await axios.post(GOOD_TAPE_API_URL, formData, { headers })
    return response.data
  } catch (err) {
    console.error('Error uploading audio:', err)
    throw err
  }
}
