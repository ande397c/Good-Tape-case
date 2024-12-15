import './App.css'
import {Search} from './components/Search'

const App = () => {

  return (
    <>
    <div className='text-center'>
    <h1 className='text-2xl'>Welcome to the transponder dade joke transcriber</h1>
    <p>Search by typing a keyword or by speaking a keyword</p>
    </div>
    <Search/>
    </>
  )
}

export default App
