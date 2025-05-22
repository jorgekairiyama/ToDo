import * as React from 'react';
import './App.css'
import AddToDoItemForm from './component/addToDoItemForm';
import SearchToDoForm from './component/toDoList/searchToDoForm';
import { useStorageState } from './utils';
//import { initialStateToDo, toDoReducer } from './store/toDoReducer';
import { Routes, Route, Link, Outlet } from "react-router";


function App()
{

  const [searchTerm, setSearchTerm] = useStorageState('search', 'React');
  //const [toDos, dispatchToDos] = React.useReducer(toDoReducer, initialStateToDo);
  const [toDoDTOState, setToDoDTOState] = React.useState({
    Id: 0,
    Name: "",
    IsComplete: false
  });

  return (
    <div>
      <h1>To Do List</h1>

      <Navigation />

      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <SearchToDoForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setToDoDTOState={setToDoDTOState}
              />}
          />

          <Route
            path="add"
            element={
              <AddToDoItemForm
                toDoDTOState={toDoDTOState}
                setToDoDTOState={setToDoDTOState}
              />
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>


    </div >
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
      <Link to="/">List</Link>
      &nbsp;
      <Link to="/add" onClick={handleClickNewToDo}>Add</Link>
    </nav>
  );
};

const Layout = () =>
{
  return (
    <main style={{ padding: '3rem 0' }}>
      <Outlet />
    </main>
  );
};

const NoMatch = () =>
{
  return (<p>There's nothing here: 404!</p>);
};
export default App;

const handleClickNewToDo = () =>
{
  setToDoDTOState(
    {
      Id: 0,
      Name: "",
      IsComplete: false
    });
}