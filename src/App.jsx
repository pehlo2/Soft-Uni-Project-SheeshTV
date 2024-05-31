
import './App.css'
import Navigation from './components/header/navigation/Navigation'
import Footer from './components/footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/login-form/Login'
import Register from './components/register-form/Register'
import NotFound from './components/not-found/Not-Found'


function App() {


  return (
    <>
      <Navigation />


      <main >
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/login' element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />
          <Route path='*' element={<NotFound></NotFound>} />
        </Routes>
      </main>

      <Footer />

    </>
  )
}

export default App
