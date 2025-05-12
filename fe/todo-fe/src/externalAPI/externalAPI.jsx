
const API_ENDPOINT = 'https://localhost:7034/api/TodoItems';

//export async function fetchList()
const fetchList = async () => fetch(`${API_ENDPOINT}`);
// {
// const result = await fetch(`${API_ENDPOINT}`);
// if (!result.ok)
// {
//     throw new Error(`Response status: ${response.status}`);
// }

// const json = await response.json();
// return json;
// }

export { fetchList };