import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HOME from './pages/Home'
import LoginPage from './pages/Login'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HOME />} />
{/* `      <Route path='/about' element={<h1>About Page</h1>} /> */}
      <Route path='/login' element={<LoginPage />} />
`    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
