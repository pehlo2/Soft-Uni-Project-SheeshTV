import { useState } from 'react'
import loginCss from './Login.module.css'
import { Link } from 'react-router-dom'
import * as request from '../../lib/request'
import { useNavigate } from 'react-router-dom'
import { endpoints } from '../../lib/endpoints'

export default function () {

    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))

    }


    const submitHandler = async (e) => {
        e.preventDefault()
        ///TO DO REQUEST
        let user = await request.post(endpoints.login, formValues)
        console.log(user);
        navigate('/')

    }




    return (
        <div className={loginCss["container"]} id="container">
            <div className={loginCss["form-container"]}>
                <form action="#" onSubmit={submitHandler} >
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
                    <input type="email" placeholder="Email" name='email' value={formValues.email} onChange={changeHandler} />
                    <input type="password" placeholder="Password" name='password' value={formValues.password} onChange={changeHandler} />
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