import React from 'react';
import styles from './Pop-up.module.css';

const Popup = ({  isVisible }) => {
    return (
        <div className={`${styles.popup} ${isVisible ? styles.show : ''}`}>
            Link copied
        </div>
    );
};

export default Popup;
