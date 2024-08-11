const reducer = (state, action) => {
  
    switch (action?.control) {
        case 'GET_ALL_COMMENTS':
            return [...action.comment];
        case 'ADD_COMMENT':
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
