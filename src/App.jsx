
import './App.css'
import Navigation from './components/header/navigation/Navigation'
import Footer from './components/footer/Footer'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login-form/Login'
import Register from './components/register-form/Register'
import NotFound from './components/not-found/Not-Found'
import { useEffect, useState } from 'react'
import Profile from './components/profile/Profile-page'
import UploadVideo from './components/uploadVideo/Upload'
import VideoDashboard from './components/videos-dashboard/Videos-dashboard'
import AuthContext from './context/authContext'
import * as userService from './services/userServices'
import Logout from './components/logout/Logout'



function App() {
  const navigate = useNavigate()


  const [auth, setAuth] = useState(() => {
    return {}
  })
  const [theme, setTheme] = useState('dark')
 
  const loginSubmitHandler = async (values) => {
    const result = await userService.login(values)
    console.log(result);
    setAuth(result)
    navigate('/')
  }
  const registerSubmitHandler = async (values) => {
    const result = await userService.register(values)

    setAuth(result)
    navigate('/')
  }

  const logoutHandler = async () => {
  
    setAuth({})
    navigate('/')
  }
  // THEME


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



  const values = {
    logoutHandler,
    registerSubmitHandler,
    loginSubmitHandler,
    username: auth.username,
    email: auth.email,
    userId:auth._id,
    isAuthenticated: !!auth.accessToken
  }


  return (
    <AuthContext.Provider value={values}>
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
            <Route path='/dashboard' element={<VideoDashboard />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
        </main>
        <Footer />

      </div>
    </AuthContext.Provider>
  )
}

export default App;
