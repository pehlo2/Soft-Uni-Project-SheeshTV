

import styles from './Comments-tab.module.css'

import InputComments from '../comments-input/Coments-input';
import useComments from '../../hooks/useComments';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';

const CommentsSection = ({
    videoId
}) => {
   
 
    const { userId } = useContext(AuthContext);
    const { comments, deleteComment, text, addComment, handleCommentChange } = useComments(videoId);

    const handleAddComment = async (e) => {
        e.preventDefault();
        await addComment(userId);
    
    };


    return (
        <>

            <div className={styles["comments"]} >
                {comments.map(comment => (
                    <div className={styles["user-comment"]} key={comment._id}>
                        <h4>{comment.author}</h4>
                        <p>{comment.text}</p>
                        <p>{comment.createdAt}</p>
                        <button onClick={() => { deleteComment(comment._id) }}>x</button>
                    </div>


                ))}

            </div>

         <InputComments videoId={videoId} handleAddComment={handleAddComment} handleCommentChange={handleCommentChange} text={text} />
        </>
    )
}

export default CommentsSection;



