import Item from './item';

const List = ({ list, onRemoveItem, onEditItem }) =>
    <ul>
        {list.map((itm) => <Item
            key={itm.id}
            item={itm}
            onRemoveItem={onRemoveItem}
            onEditItem={onEditItem}
        />)}
    </ul>


export default List;