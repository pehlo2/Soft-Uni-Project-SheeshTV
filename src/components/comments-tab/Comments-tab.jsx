import styles from './Comments-tab.module.css';
import InputComments from '../comments-input/Coments-input';
import { useCommentsContext } from '../../context/commentsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFileEdit, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faCheckToSlot } from '@fortawesome/free-solid-svg-icons/faCheckToSlot';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';

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
        cancelEditing();
    };
   console.log(comments);
    return (
        <>
            <div className={styles["comments"]}>
                {comments.map(comment =>
                                   
                (
                    <div className={styles["user-comment"]} key={comment._id}>
                        <h4>{comment.author.username}</h4>
                        {editingCommentId === comment._id ? (
                            <form onSubmit={(e) => handleEditSubmit(e, comment._id)}>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={handleEditingChange}
                                />
                                <button type="submit" className={styles['check']}><FontAwesomeIcon icon={faCheck} /></button>
                                <button type="button" onClick={cancelEditing} className={styles['cancel']}><FontAwesomeIcon icon={faBan} /></button>
                            </form>
                        ) : (
                            <>
                                <p>{comment.text}</p>
                                <p>{comment.createdAt}</p>
                                <button onClick={() => deleteComment(comment._id)} className={styles['delete']}><FontAwesomeIcon icon={faXmark} /></button>
                                <button onClick={() => startEditing(comment._id, comment.text)} className={styles['edit']}><FontAwesomeIcon icon={faFileEdit} /></button>
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
