import SearchForm from '../searchForm';
import List from './list';
//import { fetchListByName, deleteToDoItem } from '../../externalAPI/externalAPI';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { fetchByNameAsync } from '../../store_rtk/toDoSlice';

const SearchToDoForm = function ({
    searchTerm,
    setSearchTerm,
    setToDoDTOState
})
{
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const toDoSliceState = useSelector((state) => state.toDo);

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
        // //
        // dispatchToDos({ type: 'TODO_DELETE_INIT' });
        // deleteToDoItem(item.id)
        //     .then((result) =>
        //     {
        //         dispatchToDos({
        //             type: 'TODO_DELETE_SUCCESS',
        //             payload: item.id,
        //         });
        //     })
        //     .catch(() =>
        //         dispatchToDos({
        //             type: 'TODO_DELETE_FAILURE',
        //             payload: "Error deleting",
        //         })
        //     );

        // dispatchToDos({
        //     type: 'REMOVE_TODO',
        //     payload: item.id,
        // });
    }

    const handleOnEditItem = (item) =>
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
        {/* {toDos.isError && <p>{toDos.error_msg} ...</p>}
        {console.log(`Main ${toDos.data}`)}
        {toDos.isLoading ? (
            <p>Loading ...</p>
        ) : (
            <List list={toDos.data} onRemoveItem={handleRemoveToDo} onEditItem={handleOnEditItem} />
        )} */}

        {/* 
        {toDoSliceState.isError && <p>{toDoSliceState.error_msg} ...</p>}
        {console.log(`Main ${toDoSliceState.data}`)}
        {toDoSliceState.isLoading ? (
            <p>Loading ...</p>
        ) : (
            <List list={toDoSliceState.data} onRemoveItem={handleRemoveToDo} onEditItem={handleOnEditItem} />
        )}
         */}
    </>)
};

export default SearchToDoForm;
