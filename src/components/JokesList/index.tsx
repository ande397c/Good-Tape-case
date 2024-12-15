import { JokeCard } from '../JokeCard'
import { TJoke } from '../../types/Joke'

interface JokesListProps {
  jokes: TJoke[] | undefined
}

export const JokesList = ({ jokes }: JokesListProps) => {
  if (!jokes || jokes.length === 0) return 
    return (
      <section className="flex flex-col gap-4">
        {jokes?.map(joke => <JokeCard key={joke.id} joke={joke.joke} />)}
      </section>
    )
}
