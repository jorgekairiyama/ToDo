import SearchForm from '../searchForm';
import List from './list';
//import { fetchListByName, deleteToDoItem } from '../../externalAPI/externalAPI';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { fetchByNameAsync, deleteToDoAsync } from '../../store_rtk/toDoSlice';

const SearchToDoForm = function ({
    searchTerm,
    setSearchTerm,
    setToDoDTOState
})
{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toDoSliceState = useSelector((state) => state.toDos);

    const handleSearchInput = (event) => setSearchTerm(event.target.value);

    const handleFetchStories = function (event) 
    {
        console.log(`handleFetchStories ${searchTerm}`);
        if (!searchTerm) return;
        dispatch(fetchByNameAsync(searchTerm));
        event.preventDefault();
    };
    const handleRemoveToDo = (item) =>
    {
        console.log(`handleRemoveToDo ${item}`);
        dispatch(deleteToDoAsync(item.id));
    }

    const handleOnEditToDo = (item) =>
    {

        const itmDto = {
            Id: item.id,
            Name: item.name,
            IsComplete: item.isComplete
        };
        setToDoDTOState(itmDto);
        navigate("../add");
    };

    return (<>
        <SearchForm
            searchTerm={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleFetchStories}
        />

        <hr />

        {toDoSliceState.isError && <p>{toDoSliceState.error_msg.title} ...</p>}
        {console.log(`SearchToDoForm ${toDoSliceState.data}`)}
        {toDoSliceState.isLoading && <p>Loading ...</p>}
        {toDoSliceState.data.length &&
            <List list={toDoSliceState.data} onRemoveItem={handleRemoveToDo} onEditItem={handleOnEditToDo} />
        }

    </>)
};

export default SearchToDoForm;
