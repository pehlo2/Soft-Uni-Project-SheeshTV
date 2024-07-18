import { createContext, useContext, useEffect, useReducer, useState } from "react";

import reducer from "../reducers/commentReducer";
import AuthContext from "./authContext";
import * as commentsServices from '../services/commentService';

import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000');





const CommentsContext = createContext();
export default CommentsContext;

export const CommnentsProvider = ({ children, videoId }) => {


    const [comments, dispatch] = useReducer(reducer, []);
    const [text, setText] = useState('');
    const [editingText, setEditingText] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const { userId, username, avatar } = useContext(AuthContext)
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
        commentsServices.deleteComment(commentId);
        dispatch({
            control: 'REMOVE_COMMENT',
            comment: commentId
        });
    };

    const addComment = async () => {
     
        const newComment = await commentsServices.createComment(videoId, text, userId, username);

        const comment = {
            _id: newComment._id,
            author: {
                _id: userId,
                username,
                // created_at:newComment.createdAt,
                avatar

            },
            text: text,
        }


        if (newComment) {
            dispatch({
                control: 'ADD_COMMENT',
                comment: comment
            });

        }

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


    return (
        <CommentsContext.Provider value={{
            comments, text,
            editingText,
            editingCommentId,
            addComment,
            deleteComment,
            handleCommentChange,
            handleEditingChange,
            startEditing,
            cancelEditing,
            editComment
        }}>
            {children}
        </CommentsContext.Provider>

    )
}

// export default  CommnentsProvider;