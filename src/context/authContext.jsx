import { createContext, useEffect, useState, } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import * as userService from '../services/userServices'
import usePersistedState from "../hooks/usePersistedState"
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()


  const [auth, setAuth] = usePersistedState('user', {})
  const [error, setError] = useState(null)
  const location = useLocation();


  useEffect(() => {
    setError(null);
  }, [location.pathname]);


  const loginSubmitHandler = async (values) => {
    try {
      const result = await userService.login(values)
      localStorage.setItem('accessToken', result.accessToken);
      setError(null)
      setAuth(result)
      navigate('/')
    } catch (error) {
      setError(error.message)

    }

  }
  const registerSubmitHandler = async (values) => {

    try {
      const result = await userService.register(values)
      localStorage.setItem('accessToken', result.accessToken);
      setError(null)
      setAuth(result)
      navigate('/')
    } catch (error) {
      setError(error.message)

    }

  }

  const logoutHandler = async () => {
    localStorage.removeItem('accessToken');
    setAuth({})
    navigate('/')
  }

  const updateProfileHandler = async (user) => {
  
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      storedUser.username = user.username;
      storedUser.email = user.email;
      if (avatar) {
        storedUser.avatar = user.avatar;
      }
      localStorage.setItem('user', JSON.stringify(storedUser));
    }
    setAuth(storedUser)
  };


  const values = {
    updateProfileHandler,
    logoutHandler,
    registerSubmitHandler,
    loginSubmitHandler,
    username: auth.username,
    email: auth.email,
    userId: auth._id,
    isAuthenticated: !!auth.accessToken,
    avatar: auth.avatar,
    error: error
  }

  return (
    <AuthContext.Provider value={values} >
      {children}
    </AuthContext.Provider>
  );
}


AuthContext.displayName = 'AuthContext'

export default AuthContext;