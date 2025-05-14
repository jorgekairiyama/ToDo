import SearchForm from '../searchForm';
import List from './list';
import { fetchListByName, deleteToDoItem } from '../../externalAPI/externalAPI';

const SearchToDoForm = function ({
    searchTerm,
    setSearchTerm,
    // onSearchInput,
    //onSearchSubmit,
    toDos,
    dispatchToDos
    //handleRemoveStory,
})
{
    const handleSearchInput = (event) => setSearchTerm(event.target.value);

    const handleFetchStories = function (event) 
    {
        console.log(`useCallback ${searchTerm}`);
        if (!searchTerm) return;
        dispatchToDos({ type: 'STORIES_FETCH_INIT' });
        fetchListByName(searchTerm)
            .then((result) =>
            {
                dispatchToDos({
                    type: 'STORIES_FETCH_SUCCESS',
                    payload: result.data,
                });
            })
            .catch(() =>
                dispatchToDos({ type: 'STORIES_FETCH_FAILURE', payload: "Something went wrong" })
            );

        event.preventDefault();
    };
    const handleRemoveToDo = (item) =>
    {
        //
        dispatchToDos({ type: 'TODO_DELETE_INIT' });
        deleteToDoItem(item.id)
            .then((result) =>
            {
                dispatchToDos({
                    type: 'TODO_DELETE_SUCCESS'
                });
            })
            .catch(() =>
                dispatchToDos({
                    type: 'TODO_DELETE_FAILURE',
                    payload: "Error deleting",
                })
            );

        dispatchToDos({
            type: 'REMOVE_TODO',
            payload: item,
        });
    }


    return (<>
        <SearchForm
            searchTerm={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleFetchStories}
        />

        <hr />
        {toDos.isError && <p>{toDos.error_msg} ...</p>}
        {console.log(`Main ${toDos.data}`)}
        {toDos.isLoading ? (
            <p>Loading ...</p>
        ) : (
            <List list={toDos.data} onRemoveItem={handleRemoveToDo} />
        )}
    </>)
};

export default SearchToDoForm;
