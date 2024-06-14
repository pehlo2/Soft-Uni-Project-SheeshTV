const reducer = (state, action) => {
    debugger
    switch (action?.control) {
        case 'GET_ALL_COMMENTS':
            return [...action.comment];
        case 'ADD_COMMENT':
            console.log('ADD_COMMENT action triggered');
            return [...state, action.comment];
        case 'EDIT_COMMENT':
            return state.map(comment => comment._id === action.comment._id ? { ...comment, text: action.text } : comment)
        case 'REMOVE_COMMENT':
            return state.filter(comment => comment._id !== action.comment);
        default:
            return state;
    }
}

export default reducer;
