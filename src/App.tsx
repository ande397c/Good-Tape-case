import { JokeExplorer } from './components/JokeExplorer'

const App = () => {
  return (
    <>
      <div className="text-center m-4">
        <h1 className="text-2xl">
          Welcome to the dad joke transcriber transponder
        </h1>
        <p>Search by typing a keyword or by speaking a keyword</p>
      </div>
      <JokeExplorer />
    </>
  )
}

export default App
