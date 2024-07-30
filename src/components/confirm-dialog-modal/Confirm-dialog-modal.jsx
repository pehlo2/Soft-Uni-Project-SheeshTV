import React from 'react';
import styles from './Confirm-dialog-modal.module.css';

const ConfirmDeleteModal = ({ type, handleClose, handleConfirm }) => {
    return (
        <div className={styles['blur']}onClick={handleClose}>
            <div className={styles["modal-content"]}>
                <span className={styles["close"]} onClick={handleClose}>&times;</span>
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this {type}?</p>
                <button className={styles["cancel-button"]} onClick={handleClose}>Cancel</button>
                <button className={styles["delete-button"]} onClick={handleConfirm}>Delete</button>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;