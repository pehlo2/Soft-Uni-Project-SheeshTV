import registerCss from './Register.module.css'
import { Link } from 'react-router-dom'
export default function Register() {

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
        <form action="#">
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
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className={registerCss["submit-button"]}>Sign Up</button>
        </form>
      </div>
    </div>

  )
}