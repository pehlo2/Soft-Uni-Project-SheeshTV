import { useState } from 'react';
import styles from './Coments.module.css'
import * as commentService from "../../../../../services/commentService"


const Comments = ({
    gameId
}) => {
    const [text, setText] = useState('')

    const commentChangeHandler = (e) => {
        setText(e.target.value)
    }


    const addCommentHandler = async (e) => {
        e.preventDefault()

        const newComments = await commentService.create('665e33bffc49d446a474715d', 'username', text)
        console.log(newComments);
    }

    return (
        <form className={styles["comments"]} onSubmit={addCommentHandler}>
            <input type="text" placeholder="Be first to comment" name='comment' value={text} onChange={commentChangeHandler} />
            <button className='button'>Send</button>
        </form>

    )
}

export default Comments;