import { useContext, useState } from 'react'
import loginCss from './Login.module.css'
import { Link } from 'react-router-dom'
import * as request from '../../lib/request'
import { useNavigate } from 'react-router-dom'
import { endpoints } from '../../lib/endpoints'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/authContext'

const LoginFormKeys = {
    email: 'email',
    password: 'password'

}
export default function Login() {


    const {loginSubmitHandler } = useContext(AuthContext)


    const { values, onChange, onSubmit } = useForm(loginSubmitHandler, {
        [LoginFormKeys.email]:"",
        [LoginFormKeys.password]:""
    })
    // const navigate = useNavigate()




    return (
        <div className={loginCss["container"]} id="container">
            <div className={loginCss["form-container"]}>
                <form action="#" onSubmit={onSubmit} >
                    <h1>Sign in</h1>
                    <div className={loginCss["social-container"]}>
                        <a href="#" className={loginCss["social"]}>
                            <div className={loginCss["media"]}>
                                <img src="icons/128px-Facebook_Logo_2023.png" alt="" />
                            </div>
                        </a>
                        <a href="#" className={loginCss["social"]}>
                            <div className={loginCss["media"]}>
                                <img src="icons/Logo-google-icon-PNG.png" alt="" />
                            </div>
                        </a>
                        <a href="#" className={loginCss["social"]}>
                            <div className={loginCss["media"]}>
                                <img src="icons/twitter_3670151.png" alt="" />
                            </div>
                        </a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" placeholder="Email" name={LoginFormKeys.email} value={values[LoginFormKeys.email]} onChange={onChange} />
                    <input type="password" placeholder="Password" name={LoginFormKeys.password} value={values[LoginFormKeys.password]} onChange={onChange} />
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className={loginCss["overlay-container"]}>
                <div className={loginCss["overlay"]}>
                    <div className={loginCss["overlay-panel"]}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <Link to="/register">
                            <button className={loginCss["ghost"]} id="signUp">
                                Sign Up
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>

    )
}