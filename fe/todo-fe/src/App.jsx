import * as React from 'react';
import './App.css'
import List from './toDoList/list';
import ToDoItem from './toDoList/toDoItem';
import { useStorageState } from './utils';
//import SearchForm from './component/searchForm';
import { fetchListByName, saveToDoItem } from './externalAPI/externalAPI';


function App()
{
  const storiesReducer = (state, action) =>
  {
    console.log(`storiesReducer ${action.type}`);
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
      case 'TODO_POST_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          //data: action.payload,
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
      },],
      isLoading: false,
      isError: false
    }
  );

  const handleFetchStories = React.useCallback((event) =>
  {
    console.log(`useCallback ${searchTerm}`);
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

    event.preventDefault();
  }, [searchTerm]);

  const handleNewToDoItem = function (event, toDoDTO)
  {
    console.log(`entering in handleNewToDoItem ${toDoDTO.Name} ${toDoDTO.IsComplete}`);
    if (!toDoDTO.Name) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    saveToDoItem(toDoDTO)
      .then((result) =>
      {
        console.log("Saving in handleNewToDoItem");
        dispatchStories({
          type: 'TODO_POST_SUCCESS',
          //payload: result.data,
        });
        console.log(`Saving in handleNewToDoItem ${result}`);
      })
      .catch((e) =>
      {
        console.log(`Saving error: ${e}`);
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' });

      }
      );

    event.preventDefault();
  }



  const handleRemoveStory = (item) =>
  {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }

  const handleSearchInput = (event) => setSearchTerm(event.target.value);

  return (
    <div>
      <h1>To Do List</h1>
      {/* <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleFetchStories}
      /> */}

      <ToDoItem onSubmit={handleNewToDoItem} titulo="Agregar ToDo" />

      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {console.log(`Main ${stories.data}`)}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
}
export default App;
