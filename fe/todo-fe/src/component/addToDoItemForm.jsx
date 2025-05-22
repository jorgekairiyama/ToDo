import { addToDoAsync, updateToDoAsync } from '../store_rtk/toDoSlice';
import { useDispatch } from 'react-redux'

const AddToDoItemForm = ({
    toDoDTOState,
    setToDoDTOState
}) =>
{
    const dispatch = useDispatch();

    const handleSubmit = (evt) => 
    {
        evt.preventDefault();

        var toDoDTO = {
            Id: toDoDTOState.Id,
            Name: toDoDTOState.Name,
            IsComplete: toDoDTOState.IsComplete
        };

        if (toDoDTOState.Id === 0)
            handleNewToDoItem(toDoDTO);
        else
            handleUpdateToDoItem(toDoDTO);
        // evt.preventDefault();
        console.log("Saving in handleSubmit");

    };

    const handleNewToDoItem = function (toDoDTO)
    {
        console.log(`entering in handleNewToDoItem ${toDoDTO.Name} ${toDoDTO.IsComplete}`);
        if (!toDoDTO.Name) return;

        dispatch(addToDoAsync(toDoDTO));

    }

    const handleUpdateToDoItem = function (toDoDTO)
    {
        console.log(`entering in handleUpdateToDoItem ${toDoDTO.Name} ${toDoDTO.IsComplete}`);
        if (!toDoDTO.Name) return;

        dispatch(updateToDoAsync(toDoDTO));

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add new ToDo</h2>
            <label htmlFor="name">Nombre</label>
            &nbsp;
            <input
                id="name"
                type="text"
                placeholder="Nombre del supermercado"
                onChange={(event) => setToDoDTOState({ ...toDoDTOState, Name: event.target.value })}
                value={toDoDTOState.Name}
            />
            <label htmlFor="isComplete">Esta completo</label>
            &nbsp;
            <input
                id="isComplete"
                type="checkbox"
                onChange={(event) => setToDoDTOState({ ...toDoDTOState, IsComplete: event.target.checked })}
                checked={toDoDTOState.IsComplete}
            />
            <button type="submit" disabled={!toDoDTOState.Name}>
                Submit
            </button>
        </form>
    )
}

export default AddToDoItemForm;