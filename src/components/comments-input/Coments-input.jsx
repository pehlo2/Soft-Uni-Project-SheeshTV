import { useContext, useState } from 'react';
import styles from './Coments-input.module.css'

import AuthContext from '../../context/authContext';
import useComments from '../../hooks/useComments';


const InputComments = ({
    videoId
}) => {

    const {  userId } = useContext(AuthContext);
    const {  text, addComment,handleCommentChange } = useComments(videoId);

    const handleAddComment = async (e) => {
        e.preventDefault();
        await addComment(userId);
    };
    
    return (
        <form className={styles["comments"]} >
            <input type="text" placeholder="Be first to comment" name='comment' value={text} onChange={handleCommentChange} />
            <button className='button' onClick={handleAddComment}>Send</button>
        </form>

    )

}

export default InputComments;