import * as React from 'react';
import './App.css'
import AddToDoItemForm from './component/toDoList/addToDoItemForm';
import SearchToDoForm from './component/toDoList/searchToDoForm';
import { useStorageState } from './utils';
import { initialStateToDo, toDoReducer } from './store/toDoReducer';
import { saveToDoItem } from './externalAPI/externalAPI';


function App()
{

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [toDos, dispatchToDos] = React.useReducer(toDoReducer, initialStateToDo);


  const handleNewToDoItem = function (event, toDoDTO)
  {
    console.log(`entering in handleNewToDoItem ${toDoDTO.Name} ${toDoDTO.IsComplete}`);
    if (!toDoDTO.Name) return;

    dispatchToDos({ type: 'STORIES_FETCH_INIT' });

    saveToDoItem(toDoDTO)
      .then((result) =>
      {
        console.log("Saving in handleNewToDoItem");
        dispatchToDos({
          type: 'TODO_POST_SUCCESS',
          //payload: result.data,
        });
        console.log(`Saving in handleNewToDoItem ${result}`);
      })
      .catch((e) =>
      {
        console.log(`Saving error: ${e}`);
        dispatchToDos({ type: 'STORIES_FETCH_FAILURE' });

      }
      );

    event.preventDefault();
  }


  return (
    <div>
      <h1>To Do List</h1>

      <SearchToDoForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        toDos={toDos}
        dispatchToDos={dispatchToDos}
      />

      <AddToDoItemForm onSubmit={handleNewToDoItem} titulo="Agregar ToDo" />

    </div>
  );
}
export default App;
