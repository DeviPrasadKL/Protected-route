import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OutsideApp from './Components/OutsideApp'
import Protected from './Components/Protected'
import Home from './Components/Home'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    localStorage.setItem('login', false);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<OutsideApp/>} />
          <Route path="/home" element={<Protected Component={Home}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
