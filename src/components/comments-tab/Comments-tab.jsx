

import styles from './Comments-tab.module.css'

import InputComments from '../comments-input/Coments-input';
import useComments from '../../hooks/useComments';

const CommentsSection = ({
    videoId
}) => {
   
    const { comments,  deleteComment } = useComments(videoId);


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

         <InputComments videoId={videoId}/>
        </>
    )
}

export default CommentsSection;