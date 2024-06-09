import { useContext, useState } from 'react'
import registerCss from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'

import AuthContext from '../../context/authContext'
import useForm from '../../hooks/useForm'
const RegisterFormKeys = {
  email: 'email',
  password: 'password',
  rePassword:'rePassword',
  username:'username'
}

export default function Register() {
  const navigate = useNavigate()
  const { registerSubmitHandler } = useContext(AuthContext)


  const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
    [RegisterFormKeys.email]: "",
    [RegisterFormKeys.password]: "",
    [RegisterFormKeys.rePassword]: "",
    [RegisterFormKeys.username]: ""
  })


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
        <form action="#" onSubmit={onSubmit}>
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
          <input type="text" name={RegisterFormKeys.username} placeholder="Username" value={values[RegisterFormKeys.username]} onChange={onChange} />
          <input type="email" name={RegisterFormKeys.email} placeholder="Email" value={values[RegisterFormKeys.email]} onChange={onChange} />
          <input type="password" name={RegisterFormKeys.password} placeholder="Password" value={values[RegisterFormKeys.password]} onChange={onChange} />
          <input type="password" name={RegisterFormKeys.rePassword} placeholder=" Repeat Password" value={values[RegisterFormKeys.rePassword]} onChange={onChange} />
          <button className={registerCss["submit-button"]}>Sign Up</button>
        </form>
      </div>
    </div>

  )
}