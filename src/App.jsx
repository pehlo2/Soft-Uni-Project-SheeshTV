
import './App.css'
import Navigation from './components/header/navigation/Navigation'
import Footer from './components/footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login-form/Login'
import Register from './components/register-form/Register'
import NotFound from './components/not-found/Not-Found'
import { useEffect, useState } from 'react'
import Profile from './components/profile/Profile-page'
import UploadVideo from './components/uploadVideo/Upload'




function App() {


  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  }
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);

  }, []);



  return (
    <div className='app' data-theme={theme}>
      <Navigation toggleTheme={toggleTheme} />
      <main className='main-app'>
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />
          <Route path='*' element={<NotFound></NotFound>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/upload' element={<UploadVideo />} />
        </Routes>
      </main>
      <Footer />

    </div>
  )
}

export default App;
