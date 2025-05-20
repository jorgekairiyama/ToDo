import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { requestFormReset } from 'react-dom';

export const toDoApi = createApi({
    reducerPath: 'toDoApi',
    baseQuery: fetchBaseQuery({
        // Fill in your own server starting URL here
        baseUrl: 'https://localhost:7034/api/TodoItems',
    }),
    endpoints: (build) => ({
        getTodos: build.query({
            //query: () => '',
        }),
        // A query endpoint with an argument
        getTodoByName: build.query({
            query: (name) => `/filter/${name}`,
        }),
        updateTodo: build.mutation({
            query: (updatedTodo) => ({
                url: `/${updatedTodo.Id}`,
                method: 'PUT',
                body: updatedTodo,
            }),
        }),
        insertTodo: build.mutation({
            query: (toDoDTO) => ({
                // url: ``,
                method: 'POST',
                body: toDoDTO,
            }),
        }),
        deleteTodo: build.mutation({
            query: (toDoId) => ({
                url: `/${toDoId}`,
                method: 'DELETE'
            }),
        }),
    }),
});

export const { useGetTodosQuery, useGetTodoByNameQuery, useUpdateTodoMutation, useInsertTodoMutation, useDeleteTodoMutation } = api;
