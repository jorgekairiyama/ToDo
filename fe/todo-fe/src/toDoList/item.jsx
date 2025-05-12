
const Item = ({ item, onRemoveItem }) =>
{
    return (
        <li>
            {item.name} {item.isComplete}
            <button type="button" onClick={() => onRemoveItem(item)}>
                Dismiss
            </button>
        </li>
    );
}

export default Item;