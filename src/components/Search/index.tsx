import { useState } from 'react'
import { useAudioRecorder } from '../../hooks/useAudioRecorder'
import { Button } from '../Button'
import { Input } from '../Input'
import { JokeCarousel } from '../JokeCarousel'
import { JokesList } from '../JokesList'
import { faMicrophone, faSquare } from '@fortawesome/free-solid-svg-icons'
import { dadJokeService } from '../../services/dadJokeService'
import { goodTapeService } from '../../services/goodTapeService'
import { TJoke } from '../../types/Joke'

export const Search = () => {
  const [searchValue, setSearchValue] = useState('')
  const [keyword, setKeyword] = useState('')
  const [jokes, setJokes] = useState<TJoke[] | undefined>(undefined)
  // const [isLoading, setIsLoading] = useState(false)

  const {
    isRecording,
    // errorOccurred,
    // hasRecordingSupport,
    audioBlob,
    startRecording,
    stopRecording
  } = useAudioRecorder()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getDadJokesBySearch(searchValue)
    setKeyword(searchValue)
  }

  const getDadJokesBySearch = async (searchTerm: string) => {
    const data = await dadJokeService(searchTerm)
    setJokes(data.results)
  }

  const handleUpload = async () => {
    if (!audioBlob) return

    const data = await goodTapeService(audioBlob)
    const query = data.text.replace('.', ' ')
    getDadJokesBySearch(query)
    setKeyword(query)
  }

  return (
    <section className="p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
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
      {audioBlob && (
        <Button
          text="Submit recording"
          onClick={handleUpload}
          className="mt-4"
        />
      )}

      <section className="mt-4">
        {jokes && (
          <p className="text-center my-2 text-lg">
            The keword
            <span className="font-semibold text-primary"> {keyword} </span>
            gave the following dad jokes
          </p>
        )}
        {/* <JokesList jokes={jokes} /> */}

        <JokeCarousel jokes={jokes} />
      </section>
    </section>
  )
}
