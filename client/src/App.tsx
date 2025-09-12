import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AppLayout from './pages'
import HeroSection from './pages/home'
import InfiniteCanvasPage from './pages/infinite-canvas'
// import InfiniteCanvasPage from './pages/infinite-canvas'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/' element={<AppLayout />}>
          {/* This is the default content when no specific canvas is open */}
          {/* It will render HeroSection (your home.tsx) when the path is exactly '/' */}
          <Route index element={<HeroSection />} />

          {/* Route for the Infinite Canvas Page */}
          <Route path='canvas' element={<InfiniteCanvasPage />} />

          {/* Example of a dynamic route for later use */}
          {/* <Route path='canvas/:id' element={<InfiniteCanvasPage />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App