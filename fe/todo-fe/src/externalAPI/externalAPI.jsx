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