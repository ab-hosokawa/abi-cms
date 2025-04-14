import './App.css'
import { Heading } from './utils/components/parts/Heading.jsx'

function App() {
  console.log(import.meta.env.MODE)
  return (
    <>
      <Heading title={'Dashboard'} />
    </>
  )
}

export default App
