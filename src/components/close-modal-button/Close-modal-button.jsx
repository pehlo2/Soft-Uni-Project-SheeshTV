import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Close-modal-button.module.css'
import { faCircleXmark, faClose } from '@fortawesome/free-solid-svg-icons'

const CloseModalButton = ({ onClose }) => {



    return (
        <FontAwesomeIcon icon={faCircleXmark} className={styles["close-button"]} onClick={onClose} />
    )
}

export default CloseModalButton