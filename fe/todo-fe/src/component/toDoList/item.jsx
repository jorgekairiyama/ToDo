
const Item = ({ item, onRemoveItem, onEditItem }) =>
{
    return (
        <li>
            {item.name} {item.isComplete}
            <button type="button" onClick={() => onRemoveItem(item)}>
                Dismiss
            </button>
            <button type="button" onClick={() => onEditItem(item)}>
                Edit
            </button>
        </li>
    );
}

export default Item;