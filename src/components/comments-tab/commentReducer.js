const reducer = (state, action) => {

    switch (action?.control) {
        case 'GET_ALL_COMMENTS':
            return [...action.comment];
        case 'ADD_COMMENT':
            console.log('ADD_COMMENT action triggered');
            return [...state, action.comment];
        case 'EDIT_COMMENT':
            return state.map(c => c._id === action.comment._id ? { ...c, text: action.comment.text } : c)
        case 'REMOVE_COMMENT':
            return state.filter(comment => comment._id !== action.comment);
        default:
            return state;
    }
}

export default reducer;
