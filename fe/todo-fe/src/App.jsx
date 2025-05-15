import * as React from 'react';
import './App.css'
import AddToDoItemForm from './component/addToDoItemForm';
import SearchToDoForm from './component/toDoList/searchToDoForm';
import { useStorageState } from './utils';
import { initialStateToDo, toDoReducer } from './store/toDoReducer';
import { Routes, Route, Link } from "react-router";


function App()
{

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  const [toDos, dispatchToDos] = React.useReducer(toDoReducer, initialStateToDo);
  const [toDoDTOState, setToDoDTOState] = React.useState({
    Id: 0,
    Name: "",
    IsComplete: false
  })

  return (
    <div>
      <h1>To Do List</h1>

      <Navigation />

      <Routes>
        <Route
          path="search"
          element={
            <SearchToDoForm
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              toDos={toDos}
              dispatchToDos={dispatchToDos}
              setToDoDTOState={setToDoDTOState}
            />}
        />

        <Route
          path="add"
          element={
            <AddToDoItemForm
              toDoDTOState={toDoDTOState}
              setToDoDTOState={setToDoDTOState}
              dispatchToDos={dispatchToDos}
            />
          }
        />
      </Routes>


    </div>
  );
}

const Navigation = () =>
{
  return (
    <nav
      style={{
        borderBottom: "solid 3px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/search">List</Link>
      &nbsp;
      <Link to="/add">Add</Link>
    </nav>
  );
};



export default App;
