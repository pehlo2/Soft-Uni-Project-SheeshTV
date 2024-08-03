
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Error.module.css'
import { faCircleXmark, faXmark } from '@fortawesome/free-solid-svg-icons'
export const ErrorComponent = ({ errorMessage ,onClose }) => {




    return (
        <div className={styles["container"]}>
            <div className={styles["error"]}>
                <div className={styles["error-message"]}>
                    <h4>ERROR</h4>
                    <p>{errorMessage}</p>
                </div>
            </div>
            <div className={styles["button"]} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
        </div>
    )

}

