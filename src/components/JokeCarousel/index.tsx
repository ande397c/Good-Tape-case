import { useUttering } from '../../hooks/useUttering'
import { Bullet } from '../Bullet'
import { TJoke } from '../../types/Joke'
import { useState } from 'react'
import { Button } from '../Button'
import {
  faChevronRight,
  faChevronLeft,
  faVolumeHigh
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface JokeCarouselProps {
  jokes: TJoke[] | undefined
}

export const JokeCarousel = ({ jokes }: JokeCarouselProps) => {
  const { isUttering, startUttering, endUttering } = useUttering()
  const [jokeIndex, setJokeIndex] = useState(0)

  const changeJokeIndex = (e: React.MouseEvent<HTMLElement>) => {
    endUttering()
    const buttonValue = e.target as HTMLButtonElement
    if (buttonValue.value === 'right') {
      setJokeIndex(prevIndex => prevIndex + 1)
    } else {
      setJokeIndex(prevIndex => prevIndex - 1)
    }
  }

  const handleUttering = () => {
    startUttering(jokes && jokes[jokeIndex].joke)
  }

  if (!jokes) return

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center text-center w-full gap-4">
        <Button
          isDisabled={jokeIndex === 0}
          value="left"
          icon={faChevronLeft}
          onClick={e => changeJokeIndex(e)}
        />
        <div className='-flex-1 cursor-pointer min-h-40' onClick={handleUttering}>
          <FontAwesomeIcon
            icon={faVolumeHigh}
            color={isUttering ? '#853BFD' : 'inherit'}
            className={isUttering ? 'scale-125' : ''}
          />
          <h3 className="text-xl">"{jokes && jokes[jokeIndex].joke}"</h3>
        </div>
        <Button
          isDisabled={jokeIndex + 1 === jokes?.length}
          value="right"
          icon={faChevronRight}
          onClick={e => changeJokeIndex(e)}
        />
      </div>

      <div className="flex justify-center mt-4">
        {jokes?.map((_, index) => (
          <Bullet
            key={index}
            isCurrentIndex={index === jokeIndex}
            onClick={() => {
              setJokeIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
