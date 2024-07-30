import React from 'react';
import styles from './Confirm-dialog-modal.module.css';
import CloseModalButton from '../close-modal-button/Close-modal-button';

const ConfirmDeleteModal = ({ type, handleClose, handleConfirm }) => {
    return (
        <div className={styles['blur']} onClick={handleClose}>
            <div className={styles["modal-content"]}>
                {/* <span className={styles["close"]} onClick={handleClose}>&times;</span> */}
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this {type}?</p>
                <div className={styles["modal-buttons"]}>
                    <button className={styles["cancel-button"]} onClick={handleClose}>Cancel</button>
                    <button className={styles["delete-button"]} onClick={handleConfirm}>Delete</button></div>
            <CloseModalButton onClose={handleClose} />
            </div>

        </div>
    );
};

export default ConfirmDeleteModal;