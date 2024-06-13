import { useContext, useState } from 'react';
import styles from './Coments-input.module.css'

import AuthContext from '../../context/authContext';
import useComments from '../../hooks/useComments';


const InputComments = ({
    handleAddComment,
    handleCommentChange,
    text,
}) => {



    return (
        <form className={styles["comments"]} onSubmit={handleAddComment}>
            <input type="text" placeholder="Be first to comment" name='comment' value={text} onChange={handleCommentChange} />
            <button className='button'>Send</button>
        </form>

    )

}

export default InputComments;