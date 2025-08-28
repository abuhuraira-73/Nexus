import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HOME from './pages/Home'



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HOME />} />
{/* `      <Route path='/about' element={<h1>About Page</h1>} /> */}
`    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
