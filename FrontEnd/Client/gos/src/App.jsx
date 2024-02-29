import './App.css'
import Dummy from './components/Dummy'
import NewData  from './components/NewData'
import{BrowserRouter,Route,Routes} from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element = {<Dummy/>}></Route>
        <Route path='/newdata' element = {<NewData/>}></Route>
      </Routes>
      {/* <Dummy/>
      <NewData/> */}

    </BrowserRouter>
  )
}

export default App
