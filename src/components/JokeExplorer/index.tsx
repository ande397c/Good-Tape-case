import { useState } from 'react'
import { useAudioRecorder } from '../../hooks/useAudioRecorder'
import { Button } from '../Button'
import { Input } from '../Input'
import { JokeCarousel } from '../JokeCarousel'
import { JokesList } from '../JokesList'
import { ViewToggle } from '../ViewToggle'
import { faMicrophone, faSquare } from '@fortawesome/free-solid-svg-icons'
import { dadJokeService } from '../../services/dadJokeService'
import { goodTapeService } from '../../services/goodTapeService'
import { TJoke } from '../../types/Joke'
import { TView } from '../../types/View'

export const JokeExplorer = () => {
  const [searchValue, setSearchValue] = useState('')
  const [keyword, setKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [jokes, setJokes] = useState<TJoke[] | undefined>(undefined)
  const [viewPreference, setViewPreference] = useState<TView>('list')

  const {
    isRecording,
    hasRecordingSupport,
    audioBlob,
    setAudioBlob,
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
    setIsLoading(true)

    const data = await goodTapeService(audioBlob)
    const query = data.text.replace(/[,.]/g, '')
    getDadJokesBySearch(query)
    setKeyword(query)
    setAudioBlob(null)
    setSearchValue('')
    setIsLoading(false)
  }

  const renderResponseInfo = () => {
    if (jokes && jokes.length > 0) {
      return (
        <p className="text-center my-2 text-lg">
          The keyword
          <span className="font-semibold text-primary"> {keyword} </span>
          returned the following dad jokes
        </p>
      )
    } else if (jokes?.length === 0 && searchValue) {
      return (
        <p className="text-center my-2 text-lg">
          The keyword
          <span className="font-semibold text-primary"> {keyword} </span>
          returned no dad jokes
        </p>
      )
    }
  }

  return (
    <section className="p-4 container mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search for a keyword"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value)
          }}
        />
        <Button text="Search" width="fit" isDisabled={searchValue == ''} className='px-4' />
        <Button
          icon={isRecording ? faSquare : faMicrophone}
          type="button"
          width="fit"
          variant="secondary"
          className={isRecording ? 'animate-pulseScale px-3' : 'px-3'}
          onClick={isRecording ? stopRecording : startRecording}
          isDisabled={!hasRecordingSupport}
        />
      </form>
      {audioBlob && (
        <div className='w-full sm:max-w-32'> 
          <Button
            text="Use recording"
            onClick={handleUpload}
            className="mt-4"
            isLoading={isLoading}
          />
        </div>
      )}

      <section className="mt-4">
        {renderResponseInfo()}
        {jokes && jokes.length > 0 && (
          <ViewToggle
            setViewPreference={setViewPreference}
            viewPreference={viewPreference}
          />
        )}

        {viewPreference === 'list' ? (
          <JokesList jokes={jokes} />
        ) : (
          <JokeCarousel jokes={jokes} />
        )}
      </section>
    </section>
  )
}
