import styles from './Comments-tab.module.css';
import InputComments from '../comments-input/Coments-input';
import { useCommentsContext } from '../../context/commentsContext';

const CommentsSection = ({ videoId }) => {
    const {
        comments,
        deleteComment,
        editComment,
        handleEditingChange,
        editingText,
        editingCommentId,
        startEditing,
        cancelEditing
    } = useCommentsContext();

    const handleEditSubmit = async (e, commentId) => {
        e.preventDefault();
        await editComment(commentId, editingText);
        cancelEditing(); // Ensure edit mode is closed
    };

    return (
        <>
            <div className={styles["comments"]}>
                {comments.map(comment => (
                    <div className={styles["user-comment"]} key={comment._id}>
                        <h4>{comment.author}</h4>
                        {editingCommentId === comment._id ? (
                            <form onSubmit={(e) => handleEditSubmit(e, comment._id)}>
                                <input 
                                    type="text" 
                                    value={editingText} 
                                    onChange={handleEditingChange} 
                                />
                                <button type="submit">Save</button>
                                <button type="button" onClick={cancelEditing}>Cancel</button>
                            </form>
                        ) : (
                            <>
                                <p>{comment.text}</p>
                                <p>{comment.createdAt}</p>
                                <button onClick={() => deleteComment(comment._id)}>x</button>
                                <button onClick={() => startEditing(comment._id, comment.text)}>edit</button>
                            </>
                        )}
                    </div>
                ))}
            </div>

            <InputComments videoId={videoId} />
        </>
    );
}

export default CommentsSection;
