import * as React from 'react';
import './App.css'
import List from './toDoList/list';
import { useStorageState } from './utils';
import InputWithLabel from './component/inputWithLabel';
import { fetchList } from './externalAPI/externalAPI';

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
            (story) => action.payload.objectID !== story.objectID
          ),
        }
      default:
        throw new Error();
    }
  }


  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );


  // const getAsyncStories = () =>
  //   new Promise((resolve) =>
  //     setTimeout(
  //       () => resolve({ data: { stories: initialStories } }),
  //       2000
  //     )
  //   )

  React.useEffect(() =>
  {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });
    //getAsyncStories()
    fetchList()
      .then((response => response.json()))
      .then((result) =>
      {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
      );
  }, []);

  const handleRemoveStory = (item) =>
  {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const searchedStories = stories.data.filter(function (story)
  {
    return story.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>To Do List</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
}
export default App;
