import { useUttering } from '../../hooks/useUttering'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface JokeCardProps {
  joke: string
}

export const JokeCard = ({ joke }: JokeCardProps) => {
  const { isUttering, startUttering } = useUttering()

  const handleUttering = () => {
    startUttering(joke)
  }

  return (
    <>
      <button
        onClick={handleUttering}
        className="flex items-center justify-between gap-2 border border-grey p-3 rounded-md text-left"
      >
        <p>{joke}</p>

        <FontAwesomeIcon
          icon={faVolumeHigh}
          color={isUttering ? '#853BFD' : 'inherit'}
          className={isUttering ? 'scale-125' : ''}
        />
      </button>
    </>
  )
}
