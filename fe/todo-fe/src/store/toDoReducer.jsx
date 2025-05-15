const initialStateToDo = {
    data: [{
        "id": 9,
        "name": "Vital",
        "isComplete": true
    },],
    isLoading: false,
    isError: false,
    error_msg: "",
};

const toDoReducer = (state, action) =>
{
    console.log(`toDoReducer ${action.type}`);
    switch (action.type)
    {
        case 'STORIES_FETCH_INIT', 'TODO_DELETE_INIT', 'TODO_POST_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        // case 'TODO_DELETE_INIT':
        //     return {
        //         ...state,
        //         isLoading: true,
        //         isError: false,
        //     };
        // case 'TODO_POST_INIT':
        //     return {
        //         ...state,
        //         isLoading: true,
        //         isError: false,
        //     };
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'TODO_POST_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: [...state.data, action.payload],
            };

        case 'TODO_DELETE_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                //data: action.payload,
            };
        case 'STORIES_FETCH_FAILURE', 'TODO_DELETE_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                data: state.data.filter(
                    (story) => action.payload.id !== story.id
                ),
            }
        default:
            //throw new Error("reducer case not found");
            return state;
    }
};

export { initialStateToDo, toDoReducer };