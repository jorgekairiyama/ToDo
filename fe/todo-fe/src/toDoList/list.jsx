import Item from './item';

const List = ({ list, onRemoveItem }) =>
    <ul>
        {list.map((itm) => <Item
            key={itm.id}
            item={itm}
            onRemoveItem={onRemoveItem}
        />)}
    </ul>


export default List;