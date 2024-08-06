import { useContext, useEffect, useRef, useState } from 'react';
import styles from './Profile-drop-menu.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faHome, faUpload, faUser, faWrench } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../context/authContext';
const ProfileDropMenu = ({ onClose }) => {
    const { userId } = useContext(AuthContext)


    return (

        <div className={styles["drop-menu"]} >
            <Link to={`/users/${userId}`} onClick={onClose}><FontAwesomeIcon icon={faUser} /><span>Profile</span></Link>
            <Link to={`/dashboard`} onClick={onClose}><FontAwesomeIcon icon={faHome} /><span>Home</span></Link>
            <Link to={`/users/${userId}/upload`} onClick={onClose}><FontAwesomeIcon icon={faUpload} /><span>Upload</span></Link>
            <Link onClick={onClose}><FontAwesomeIcon icon={faWrench} onClick={onClose}/><span>Setting</span></Link>
            <Link className={styles['logout-button']} to="/logout" onClick={onClose}><FontAwesomeIcon icon={faArrowRightFromBracket} /><span >Logout</span></Link>
        </div>


    )
}

export default ProfileDropMenu; 