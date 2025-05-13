
const To = ({
    value = "Nombre del supermercado",
    onInputChange,
}) => (
    <>
        <label htmlFor="name">Name</label>
        &nbsp;
        <input
            id="name"
            type="text"
            value={value}
            onChange={onInputChange}
        />
    </>
)

export default InputWithLabel;