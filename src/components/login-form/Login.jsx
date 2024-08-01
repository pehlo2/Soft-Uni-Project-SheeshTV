import { useContext, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import AuthContext from '../../context/authContext'
import { object, string } from 'yup';


const LoginFormKeys = {
    email: 'email',
    password: 'password'

}
export default function Login() {


    const { loginSubmitHandler, error } = useContext(AuthContext)


    const loginSchema = object({
        email: string().required('* Email is required').email('* Invalid email format'),
        password: string().required('* Password is required').min(6, '* Password must be at least 6 characters')
    })


    const { values, onChange, onSubmit, validationErrors } = useForm(loginSubmitHandler, {
        [LoginFormKeys.email]: "",
        [LoginFormKeys.password]: ""
    }, loginSchema)

    return (
        <div className={styles["container"]} id="container">
            <div className={styles["form-container"]}>
                <form action="#" onSubmit={onSubmit} >
                    <h1>Sign in</h1>
                    <div className={styles["social-container"]}>
                        <a href="#" className={styles["social"]}>
                            <div className={styles["media"]}>
                                <img src="icons/128px-Facebook_Logo_2023.png" alt="" />
                            </div>
                        </a>
                        <a href="#" className={styles["social"]}>
                            <div className={styles["media"]}>
                                <img src="icons/Logo-google-icon-PNG.png" alt="" />
                            </div>
                        </a>
                        <a href="#" className={styles["social"]}>
                            <div className={styles["media"]}>
                                <img src="icons/twitter_3670151.png" alt="" />
                            </div>
                        </a>
                    </div>
                    <span>or use your account</span>
                    <div className={styles["input-field"]}>
                        <input type="email" placeholder="Email" name={LoginFormKeys.email} value={values[LoginFormKeys.email]} onChange={onChange} />
                        {validationErrors.email && <p className='error'>{validationErrors.email}</p>}
                    </div>
                    <div className={styles["input-field"]}>
                        <input type="password" placeholder="Password" name={LoginFormKeys.password} value={values[LoginFormKeys.password]} onChange={onChange} />
                        {validationErrors.password && <p className='error'>{validationErrors.password}</p>}
                    </div>
                    {error && <p className={styles["error"]}>{error}</p>}
                    <a href="#">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className={styles["overlay-container"]}>
                <div className={styles["overlay"]}>
                    <div className={styles["overlay-panel"]}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <Link to="/register">
                            <button className={styles["ghost"]} id="signUp">
                                Sign Up
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>

    )
}