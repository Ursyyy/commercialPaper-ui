const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_SNACKBAR':
            return {
                ...state,
                snackbar: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'REMOVE_USER':
            return {
                ...state,
                user: {
                    name: '',
                    company: ''
                }
            };
        default:
            return state;
    }
};

export default Reducer;