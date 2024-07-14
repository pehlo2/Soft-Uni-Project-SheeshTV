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
    } =useContext(CommentsContext);


    const [validationErrors, setValidationErrors] = useState({})
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

    console.log(validationErrors);



    return (
        <>
            <div className={styles["comments"]}>
                {comments.map(comment =>

                (
                    <div className={styles["user-comment"]} key={comment._id}>
                        <div className={styles["user-info"]}>
                            <img src={comment.author.avatar} alt="" />
                            <h4>{comment.author.username}</h4>
                        </div>

                        {editingCommentId === comment._id ? (
                            <form onSubmit={(e) => handleEditSubmit(e, comment._id)}>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={handleEditingChange}
                                    className={validationErrors.editingText ? styles["error-border"] : ""}
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
