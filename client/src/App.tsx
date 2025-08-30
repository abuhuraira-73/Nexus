import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AppLayout from './pages'
import HeroSection from './pages/Home'
// import InfiniteCanvasPage from './pages/infinite-canvas'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Routes */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>} />

        {/* The AppLayout will render the sidebar and an <Outlet /> */}
        <Route path='/' element={<AppLayout />}>
          {/* This is the default content when no specific canvas is open */}
          {/* It will render HeroSection (your home.tsx) when the path is exactly '/' */}
          <Route index element={<HeroSection />} />


          {/* Route for the Infinite Canvas Page */}
          {/* This route will match paths like /canvas/123 or /canvas/my-project-id */}
          {/* You will create InfiniteCanvasPage.tsx later */}
          {/* <Route path='canvas/:id' element={<InfiniteCanvasPage />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

