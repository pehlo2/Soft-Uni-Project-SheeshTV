import { useContext, } from 'react'
import styles from './Register.module.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/authContext'
import useForm from '../../hooks/useForm'
import { object, string, ref } from 'yup';



const RegisterFormKeys = {
  email: 'email',
  password: 'password',
  rePassword: 'rePassword',
  username: 'username'
}

export default function Register() {

  const { registerSubmitHandler,error } = useContext(AuthContext)

  const registerSchema = object({
    username: string().required('* Username is required').min(6, '* Username must be at least 6 characters'),
    email: string().required('* Email is required').email('* Invalid email format'),
    password: string().required('* Password is required').min(6, '* Password must be at least 6 characters'),
    rePassword: string().oneOf([ref("password")], '* Password must match').required('* Confirm password is required')
  })




  const { values, onChange, onSubmit, validationErrors } = useForm(registerSubmitHandler, {
    [RegisterFormKeys.email]: "",
    [RegisterFormKeys.password]: "",
    [RegisterFormKeys.rePassword]: "",
    [RegisterFormKeys.username]: ""
  }, registerSchema)







  return (
    <div className={styles["container"]} id="container">
      <div className={styles["overlay-container"]}>
        <div className={styles["overlay-panel"]}>
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Link to="/login">
            <button className={styles["ghost"]} id="signIn">
              Sign In
            </button>
          </Link>

        </div>
      </div>
      <div className={styles["form-container"]}>
        {/*  */}
        <form action="#" onSubmit={onSubmit}>
          <h1>Create Account</h1>
          <div className={styles["social-container"]}>
            <a href="#" className={styles["social"]}>
              <div className={styles["media"]}>
                <img src="/icons/128px-Facebook_Logo_2023.png" alt="" />
              </div>
            </a>
            <a href="#" className={styles["social"]}>
              <div className={styles["media"]}>
                <img src="/icons/Logo-google-icon-PNG.png" alt="" />
              </div>
            </a>
            <a href="#" className={styles["social"]}>
              <div className={styles["media"]}>
                <img src="/icons/twitter_3670151.png" alt="" />
              </div>
            </a>
          </div>
          <span>or use your email for registration</span>
          <div className={styles["input-field"]}>
            <input type="text" name={RegisterFormKeys.username} placeholder="Username" value={values[RegisterFormKeys.username]} onChange={onChange} />
            {validationErrors.username && <p className='error'>{validationErrors.username}</p>}
          </div>
          <div className={styles["input-field"]}>
            <input type="email" name={RegisterFormKeys.email} placeholder="Email" value={values[RegisterFormKeys.email]} onChange={onChange} />
            {validationErrors.email && <p className='error'>{validationErrors.email}</p>}
          </div>
          <div className={styles["input-field"]}>
            <input type="password" name={RegisterFormKeys.password} placeholder="Password" value={values[RegisterFormKeys.password]} onChange={onChange} />
            {validationErrors.password && <p className='error'>{validationErrors.password}</p>}
          </div>
          <div className={styles["input-field"]}>
            <input type="password" name={RegisterFormKeys.rePassword} placeholder=" Repeat Password" value={values[RegisterFormKeys.rePassword]} onChange={onChange} />
            {validationErrors.rePassword && <p className='error'>{validationErrors.rePassword}</p>}
          </div>
        {error && <p className={styles["error"]}>{error}</p>}
          <button className={styles["submit-button"]}>Sign Up</button>

        </form>
      </div>
    </div>

  )
}

