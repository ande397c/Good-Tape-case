import { useEffect, useState } from 'react'
// import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import { useSpeechRecogniction } from '../../hooks/useSpeechRecogniction'
import { Button } from '../Button'
import { Input } from '../Input'
import { faMicrophone, faSquare } from '@fortawesome/free-solid-svg-icons'
import { dadJokeService } from '../../services/dadJokeService'
// import {goodTapeService} from '../../services/goodTapeService'
import { TJoke } from '../../types/Joke'

export const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [jokes, setJokes] = useState<TJoke[] | undefined>(undefined)

  const { isRecording, text, startRecording, stopRecording } =
    useSpeechRecogniction()

  const getDadJokesBySearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = await dadJokeService(searchValue)
    console.log(data)
    setJokes(data.results)
    //   setSearchValue('');
  }

  useEffect(() => {
    const getDadJokesBySpeak = async () => {
      if (!text) return
      const data = await dadJokeService(text)
      setJokes(data.results)
    }
    getDadJokesBySpeak()
  }, [text])

  return (
    <section className="p-2">
      <form onSubmit={getDadJokesBySearch} className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search for a keyword"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value)
          }}
        />
        <Button text="Search" width="1/2" isDisabled={searchValue == ''} />
        <Button
          icon={isRecording ? faSquare : faMicrophone}
          type="button"
          width="fit"
          variant="outline"
          className="px-3"
          onClick={isRecording ? stopRecording : startRecording}
        />
      </form>
      {/* <Button text="Submit recording" onClick={handleUpload} isDisabled={!audioBlob} /> */}

      {jokes?.map(joke => <p>{joke.joke}</p>)}
    </section>
  )
}
