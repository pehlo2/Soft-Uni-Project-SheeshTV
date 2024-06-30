import { createContext,} from "react"
import { useNavigate } from "react-router-dom"

import * as userService from '../services/userServices'
import usePersistedState from "../hooks/usePersistedState"
const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()


  const [auth, setAuth] = usePersistedState('user',{})




  const loginSubmitHandler = async (values) => {
    const result = await userService.login(values)
    localStorage.setItem('accessToken', result.accessToken);
    setAuth(result)
    navigate('/')
  }
  const registerSubmitHandler = async (values) => {
    const result = await userService.register(values)
    localStorage.setItem('accessToken', result.accessToken);
    setAuth(result)
    navigate('/')
  }

  const logoutHandler = async () => {
    localStorage.removeItem('accessToken');
    setAuth({})
    navigate('/')
  }

  const values = {
    logoutHandler,
    registerSubmitHandler,
    loginSubmitHandler,
    username: auth.username,
    email: auth.email,
    userId: auth._id,
    isAuthenticated: !!auth.accessToken,
    avatar: auth.avatar
    
  }

  return (
    <AuthContext.Provider value={values} >
      {children}
    </AuthContext.Provider>
  );
}


AuthContext.displayName = 'AuthContext'

export default AuthContext;