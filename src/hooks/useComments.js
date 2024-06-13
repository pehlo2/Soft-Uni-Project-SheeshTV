import { useEffect, useReducer, useState } from "react"
import reducer from "../components/comments-tab/commentReducer"
import * as  commentsServices from '.././services/commentService'

export default function useComments(videoId) {

 
    const [comments, dispatch] = useReducer(reducer, [])
    const [text, setText] = useState('');

    useEffect(() => {
        if (!videoId) {
            return

        }
        commentsServices.getAllVideoComments(videoId).then((result) => {
            dispatch({
                control: 'GET_ALL_COMMENTS',
                comment: result,
            });
        });
    }, [videoId]);

    const deleteComment = async (commentId) => {
        await commentsServices.deleteComment(commentId);
        dispatch({
            control: 'REMOVE_COMMENT',
            comment: commentId
        });
    };

    const addComment = async (userId) => {
        const newComment = await commentsServices.createComment(videoId, text, userId);
        dispatch({
            control: 'ADD_COMMENT',
            comment: newComment
        });
        setText('')
    };
    
    


    const handleCommentChange = (e) => {
        setText(e.target.value);
    };

    return {
        comments,
        text,
        addComment,
        deleteComment,
        handleCommentChange,
    }

}

