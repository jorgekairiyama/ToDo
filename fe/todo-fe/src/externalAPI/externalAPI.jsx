import axios from 'axios';

const API_ENDPOINT = 'https://localhost:7034/api/TodoItems';

//export async function fetchList()
export const fetchList = async () => axios.get(`${API_ENDPOINT}`);

export const fetchListByName = (name) => axios.get(`${API_ENDPOINT}/filter/${name}`);
// export function fetchListByName(name)
// {
//     return axios.get(`${API_ENDPOINT}/filter/${name}`);
// }

//export { fetchList };

export const saveToDoItem = (toDoDTO) =>
    axios.post(API_ENDPOINT,
        toDoDTO
        // , {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }
    );

export const deleteToDoItem = (toDoId) => axios.delete(`${API_ENDPOINT}/${toDoId}`);