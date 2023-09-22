import { useState } from 'react'
import './App.css'
import OutsideApp from './Components/OutsideApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <OutsideApp/>
    </div>
  )
}

export default App
