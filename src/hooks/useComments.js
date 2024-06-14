import { useEffect, useReducer, useState } from "react";
import reducer from "../components/comments-tab/commentReducer";
import * as commentsServices from '../services/commentService';

export default function useComments(videoId) {
    const [comments, dispatch] = useReducer(reducer, []);
    const [text, setText] = useState('');
    const [editingText, setEditingText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null); 

    useEffect(() => {
        if (!videoId) {
            return;
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
        setText('');
    };

    const editComment = async (commentId, text) => {
        const editedComment = await commentsServices.editComment(commentId, text);
        dispatch({
            control: 'EDIT_COMMENT',
            comment: editedComment, text
        });
       
    };

    const handleCommentChange = (e) => {
        setText(e.target.value);
    };

    const handleEditingChange = (e) => {
        setEditingText(e.target.value); 
    };

    const startEditing = (commentId, currentText) => {
        setEditingCommentId(commentId);
        setEditingText(currentText);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditingText('');
    };

    return {
        comments,
        text,
        editingText,
        editingCommentId,
        addComment,
        deleteComment,
        handleCommentChange,
        handleEditingChange,
        startEditing,
        cancelEditing,
        editComment
    }
}
