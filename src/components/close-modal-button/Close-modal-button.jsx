import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Close-modal-button.module.css'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const CloseModalButton = ({onClose}) => {



    return (
        <button className={styles["close-button"]}><FontAwesomeIcon icon={faClose} onClick={onClose} /></button>

    )
}

export default CloseModalButton