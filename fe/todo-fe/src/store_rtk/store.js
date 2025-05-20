import { configureStore } from '@reduxjs/toolkit'
// Import the API object
//import { api } from './apiSlice'
// Import any other slice reducers as usual here
import toDosReducer from './toDoSlice'

export const store = configureStore({
    reducer: {
        // Add the generated RTK Query "API slice" caching reducer
        //[api.reducerPath]: api.reducer,
        // Add any other reducers
        toDos: toDosReducer,
    },
    // Add the RTK Query API middleware
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(api.middleware),
})