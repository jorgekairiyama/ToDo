import * as React from 'react';
import './App.css'
import List from './toDoList/list';
import { useStorageState } from './utils';
import SearchForm from './component/searchForm';
import { fetchListByName } from './externalAPI/externalAPI';


function App()
{
  const storiesReducer = (state, action) =>
  {
    switch (action.type)
    {
      case 'STORIES_FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case 'STORIES_FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      case 'REMOVE_STORY':
        return {
          ...state,
          data: state.data.filter(
            (story) => action.payload.id !== story.id
          ),
        }
      default:
        throw new Error("reducer case not found");
    }
  }


  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {
      data: [{
        "id": 9,
        "name": "Vital",
        "isComplete": true
      },], isLoading: false, isError: false
    }
  );

  const handleFetchStories = React.useCallback(() =>
  {
    if (!searchTerm) return;
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    fetchListByName(searchTerm)
      .then((result) =>
      {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
    // try
    // {
    //   const result = await fetchListByName(searchTerm);
    //   dispatchStories({
    //     type: 'STORIES_FETCH_SUCCESS',
    //     payload: result.data,
    //   });
    // }
    // catch (e)
    // {
    //   dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    // }
  }, [searchTerm]);

  // React.useEffect(() =>
  // {
  //   handleFetchStories();
  // }, [handleFetchStories]);

  const handleRemoveStory = (item) =>
  {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }

  const handleSearchInput = (event) => setSearchTerm(event.target.value);
  //const handleSearchSubmit = () => handleFetchStories();


  return (
    <div>
      <h1>To Do List</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleFetchStories}
      />
      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
}
export default App;
