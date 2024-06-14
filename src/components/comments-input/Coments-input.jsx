import { useContext, useState } from 'react';
import styles from './Coments-input.module.css'

import AuthContext from '../../context/authContext';
import useComments from '../../hooks/useComments';
import CommentsContext, { useCommentsContext } from '../../context/commentsContext';


const InputComments = ({
    videoId
}) => {

    const {  userId } = useContext(AuthContext);
    const { text, addComment, handleCommentChange } = useCommentsContext();

    const handleAddComment = async (e) => {
        e.preventDefault();
        if(text.trim() !== ''){

            await addComment(userId);
        }
        
    };
    
    return (
        <form className={styles["comments"]} onSubmit={handleAddComment}>
            <input type="text" placeholder="Be first to comment" name='comment' value={text} onChange={handleCommentChange} />
            <button className='button'>Send</button>
        </form>

    )

}

export default InputComments;