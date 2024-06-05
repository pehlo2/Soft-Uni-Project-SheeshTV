import { useState } from 'react'
import registerCss from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import * as request from '../../lib/request'
import { endpoints } from '../../lib/endpoints'


export default function Register() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: ""

  })

  const changeHandler = (e) => {

    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))

  }


  const submitHandler = async (e) => {
    e.preventDefault()
    let response = await request.post(endpoints.register ,formValues)
   
    navigate('/')
  }


  // const [usernameValue, setUsernameValue] = useState('')
  // const [passwordValue, setPasswordValue] = useState('')
  // const [ageValue, setAgeValue] = useState('')

  // const usernameChangeHandler = (e) => {
  //     setUsernameValue(e.target.value)
  // }

  // const passwordChangeHandler = (e) => {
  //     setPasswordValue(e.target.value)
  // }
  // const ageChangeHandler = (e) => {
  //     setAgeValue(e.target.value)
  // }
  // const resetHandler = () =>{
  //     setUsernameValue('')
  //     setPasswordValue('')
  //     setAgeValue('')

  // }
  return (
    <div className={registerCss["container"]} id="container">
      <div className={registerCss["overlay-container"]}>
        <div className={registerCss["overlay-panel"]}>
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Link to="/login">
            <button className={registerCss["ghost"]} id="signIn">
              Sign In
            </button>
          </Link>

        </div>
      </div>
      <div className={registerCss["form-container"]}>
        {/*  */}
        <form action="#" onSubmit={submitHandler}>
          <h1>Create Account</h1>
          <div className={registerCss["social-container"]}>
            <a href="#" className={registerCss["social"]}>
              <div className={registerCss["media"]}>
                <img src="/icons/128px-Facebook_Logo_2023.png" alt="" />
              </div>
            </a>
            <a href="#" className={registerCss["social"]}>
              <div className={registerCss["media"]}>
                <img src="/icons/Logo-google-icon-PNG.png" alt="" />
              </div>
            </a>
            <a href="#" className={registerCss["social"]}>
              <div className={registerCss["media"]}>
                <img src="/icons/twitter_3670151.png" alt="" />
              </div>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" name='username' placeholder="Username" value={formValues.username} onChange={changeHandler} />
          <input type="email" name='email' placeholder="Email" value={formValues.email} onChange={changeHandler} />
          <input type="password" name='password' placeholder="Password" value={formValues.password} onChange={changeHandler} />
          <input type="password" name='rePassword' placeholder=" Repeat Password" value={formValues.rePassword} onChange={changeHandler} />
          <button className={registerCss["submit-button"]}>Sign Up</button>
        </form>
      </div>
    </div>

  )
}