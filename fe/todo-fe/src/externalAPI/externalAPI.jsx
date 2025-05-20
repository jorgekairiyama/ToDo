import axios from 'axios';

const API_ENDPOINT = 'https://localhost:7034/api/TodoItems';

//export async function fetchList()
export const fetchList = async () => axios.get(`${API_ENDPOINT}`);

export const fetchListByName = (name) => axios.get(`${API_ENDPOINT}/filter/${name}`);

export const saveNewToDoItem = (toDoDTO) => axios.post(API_ENDPOINT, toDoDTO);

export const deleteToDoItem = (toDoId) => axios.delete(`${API_ENDPOINT}/${toDoId}`);

export const updateToDoItem = (toDo) => axios.put(`${API_ENDPOINT}/${toDo.Id}`, toDo);