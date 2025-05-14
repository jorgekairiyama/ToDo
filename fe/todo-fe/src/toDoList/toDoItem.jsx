import { useState } from "react";

const ToDoItem = ({
    onSubmit,
    titulo
}) =>
{
    const [iden, setIden] = useState(0);
    const [nombre, setNombre] = useState("");
    const [completo, setCompleto] = useState(false);

    const handleSubmit = (evt) => 
    {
        var toDoDTO = {
            Id: +iden,
            Name: nombre,
            IsComplete: completo
        };

        onSubmit(evt, toDoDTO);
        // evt.preventDefault();
        console.log("Saving in handleSubmit");
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>{titulo}</h2>
            <label htmlFor="iden">Id</label>
            <input
                id="iden"
                type="text"
                placeholder="Identificador (int)"
                onChange={(event) => setIden(event.target.value)}
            />
            <label htmlFor="name">Nombre</label>
            &nbsp;
            <input
                id="name"
                type="text"
                placeholder="Nombre del supermercado"
                onChange={(event) => setNombre(event.target.value)}
            />
            <label htmlFor="isComplete">Esta completo</label>
            &nbsp;
            <input
                id="isComplete"
                type="checkbox"
                onChange={(event) => setCompleto(event.target.checked)}
            />
            <button type="submit" disabled={!nombre}>
                Submit
            </button>
        </form>
    )
}

export default ToDoItem;