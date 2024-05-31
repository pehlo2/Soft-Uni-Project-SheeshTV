
import styles from './Not-Found.module.css'

export default function NotFound(){



    return(
        <div className={styles["error-container"]}> 
        <h1> 404 </h1> 
        <p> 
            Oops! The page you're 
            looking for is not here. 
        </p> 
        <a href=""> 
            Go Back to Home 
        </a> 
    </div> 
    )
}