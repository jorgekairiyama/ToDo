import { useState } from "react";
import { saveToDoItem } from '../externalAPI/externalAPI';

const AddToDoItemForm = ({
    toDoDTOState,
    setToDoDTOState,
    dispatchToDos
}) =>
{
    //     const [nombre, setNombre] = useState("");
    //     const [completo, setCompleto] = useState(false);

    const handleSubmit = (evt) => 
    {
        var toDoDTO = {
            Id: toDoDTOState.Id,
            Name: toDoDTOState.Name,
            IsComplete: toDoDTOState.IsComplete
        };

        handleNewToDoItem(evt, toDoDTO);
        // evt.preventDefault();
        console.log("Saving in handleSubmit");
    };

    const handleNewToDoItem = function (event, toDoDTO)
    {
        console.log(`entering in handleNewToDoItem ${toDoDTO.Name} ${toDoDTO.IsComplete}`);
        if (!toDoDTO.Name) return;

        dispatchToDos({ type: 'TODO_POST_INIT' });

        saveToDoItem(toDoDTO)
            .then((result) =>
            {
                console.log("Saving in handleNewToDoItem");
                dispatchToDos({
                    type: 'TODO_POST_SUCCESS',
                    payload: result.data,
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