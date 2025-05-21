import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchListByName, deleteToDoItem } from '../externalAPI/externalAPI';

const INITIAL_STATE_ToDo = {
    data: [{
        "id": 9,
        "name": "Vital",
        "isComplete": true
    },],
    isLoading: false,
    isError: false,
    error_msg: "",
};

export const fetchByNameAsync = createAsyncThunk(
    'toDo/fetchByName',
    async (name, { rejectWithValue }) =>
    {
        if (!name) return;
        try
        {
            const response = await fetchListByName(name)
            return response.data
        } catch (err)
        {
            return rejectWithValue(err.response.data)
        }
    }
)

export const deleteToDoAsync = createAsyncThunk(
    'toDo/delete',
    async (id, { rejectWithValue }) =>
    {
        if (!id) return;
        try
        {
            const response = await deleteToDoItem(id)
            return response.data
        } catch (err)
        {
            return rejectWithValue(err.response.data)
        }
    }
)

const toDoSlice = createSlice({
    name: "toDo",
    initialState: INITIAL_STATE_ToDo,
    reducers: {
        toDoInit: (state) =>
        {
            state.isLoading = true;
            state.isError = false;
        },
        toDoFailure: (state, action) =>
        {
            state.isLoading = false;
            state.isError = true;
            state.error_msg = action.payload;
        },
        toDoFechtSuccess: (state, action) =>
        {
            state.isLoading = false;
            state.isError = false;
            state.data = action.payload;
        },
        toDoPostSuccess: (state, action) =>
        {
            state.isLoading = false;
            state.isError = false;
            state.data.push(action.payload);
        },
        toDoUpdateSuccess: (state, action) =>
        {
            state.isLoading = false;
            state.isError = false;
        },
        toDoDeleteSuccess: (state, action) =>
        {
            state.isLoading = false;
            state.isError = false;
        },
    },
    extraReducers: (builder) =>
    {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchByNameAsync.pending, (state) =>
            {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchByNameAsync.fulfilled, (state, action) =>
            {
                state.isLoading = false;
                state.isError = false;
                state.data = action.payload;
            })
            .addCase(fetchByNameAsync.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.error_msg = action.payload;
                state.data = [];
            })
            // -------------------------------------------
            .addCase(deleteToDoAsync.pending, (state) =>
            {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(deleteToDoAsync.fulfilled, (state, action) =>
            {
                state.isLoading = false;
                state.isError = false;
                state.data = state.data.filter(item => item.id !== action.payload);
            })
            .addCase(deleteToDoAsync.rejected, (state, action) =>
            {
                state.isLoading = false;
                state.isError = true;
                state.error_msg = action.payload;
            })
    },
});

export const { toDoInit, toDoFailure,
    toDoFechtSuccess,
    toDoPostSuccess,
    toDoUpdateSuccess,
    toDoDeleteSuccess,
} = toDoSlice.actions;
export default toDoSlice.reducer;