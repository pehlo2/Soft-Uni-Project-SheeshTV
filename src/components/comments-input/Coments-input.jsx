
import styles from './Coments-input.module.css'
import { useCommentsContext } from '../../context/commentsContext';
import { useState } from 'react';
import { object, string } from 'yup';




const InputComments = ({
}) => {


    const { text, addComment, handleCommentChange } = useCommentsContext();
    const [validationErrors, setValidationErrors] = useState({})
    const commentSchema = object({
        text: string().required().min(1)
    });

    const handleAddComment = async (e) => {
        e.preventDefault();

        try {

            await commentSchema.validate({
                text
            }, { abortEarly: false });
            setValidationErrors({});
            await addComment();


        } catch (err) {

            const newError = {}
            err.inner.forEach(err => {
                newError[err.path] = err.message

            });
            setValidationErrors(newError)

        }

    };

    return (
        <form className={styles["comments"]} onSubmit={handleAddComment}>
            <input type="text" placeholder="Add comment..." name='comment' value={text} onChange={handleCommentChange} className={validationErrors.text ? styles["error-border"] : ""} />
            <button className={styles['button']}>Send</button>
        </form>

    )

}

export default InputComments;