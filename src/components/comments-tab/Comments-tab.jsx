import styles from './Comments-tab.module.css';
import InputComments from '../comments-input/Coments-input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileEdit } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { useContext, useState } from 'react';
import { object, string } from 'yup';

import CommentsContext from '../../context/commentsContext';
import timeDifferenceToString from '../../utils/timeDifferenceToString';
import AuthContext from '../../context/authContext';
import ConfirmDeleteModal from '../confirm-dialog-modal/Confirm-dialog-modal';

const CommentsSection = ({ videoId, videoOwner }) => {
    const {
        comments,
        deleteComment,
        editComment,
        handleEditingChange,
        editingText,
        editingCommentId,
        startEditing,
        cancelEditing
    } = useContext(CommentsContext);

    const { isAuthenticated, userId } = useContext(AuthContext)
    const [validationErrors, setValidationErrors] = useState({})
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [commentToDeleteId, setCommentToDeleteId] = useState(null);

    const commentSchema = object({
        editingText: string().required().min(1)
    });

    const handleEditSubmit = async (e, commentId) => {
        e.preventDefault();

        try {
            console.log(editingText);
            await commentSchema.validate({
                editingText
            }, { abortEarly: false });

            setValidationErrors({});
            await editComment(commentId, editingText);
            cancelEditing();

        } catch (err) {

            const newError = {}
            err.inner.forEach(err => {
                newError[err.path] = err.message

            });
            setValidationErrors(newError)

        }
    };

    const handleConfirmDelete = async () => {
        console.log(commentToDeleteId);
        await deleteComment(commentToDeleteId);
        setShowConfirmation(false);
        setCommentToDeleteId(null);
    };

    const openConfirmDeleteModal = (commentId) => {
        setCommentToDeleteId(commentId);
        setShowConfirmation(true);
    };

    return (
        <>
            <div className={styles["comments"]}>
                {comments.map(comment =>

                (
                    <div className={styles["user-comment"]} key={comment._id}>
                        <div className={styles["user-comment-inner"]}>
                            <div className={styles["user-info"]}>
                                <img src={comment.author.avatar} alt="" />
                            </div>

                            {editingCommentId === comment._id && (
                                <form onSubmit={(e) => handleEditSubmit(e, comment._id)} className={styles["comment-edit-form"]}>
                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={handleEditingChange}
                                        className={validationErrors.editingText ? styles["error-border"] : ""}
                                    />
                                    < button type="submit" className={styles['check']}><FontAwesomeIcon icon={faCheck} /></button>
                                    <button type="button" onClick={cancelEditing} className={styles['cancel']}><FontAwesomeIcon icon={faBan} /></button>
                                </form>
                            )}

                            {editingCommentId !== comment._id && (
                                <div className={styles["comment-info"]}>
                                    <h3>{comment.author.username}</h3>
                                    <p className={styles["comment-info-text"]}>{comment.text}</p>
                                    <p className={styles["comment-info-date"]}>{timeDifferenceToString(comment.createdAt)}</p>
                                </div>
                            )}
                        </div>
                        {videoOwner === userId || isAuthenticated && (
                            <div className={styles["comment-buttons"]}>
                                <button onClick={() => startEditing(comment._id, comment.text)} className={styles['edit']}><FontAwesomeIcon icon={faFileEdit} /></button>
                                <button onClick={() => openConfirmDeleteModal(comment._id)} className={styles['delete']}><FontAwesomeIcon icon={faXmark} /></button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isAuthenticated && <InputComments videoId={videoId} />}
            {showConfirmation && <ConfirmDeleteModal show={() => setShowConfirmation(true)} handleClose={() => setShowConfirmation(false)} handleConfirm={handleConfirmDelete} type='Video' />}
        </>
    );
}

export default CommentsSection;
