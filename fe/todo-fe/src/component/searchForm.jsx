import InputWithLabel from './inputWithLabel';

const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
}) =>
{

    return (
        <form onSubmit={onSearchSubmit}>
            <h2>Search</h2>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={onSearchInput}
            >
                <strong>Search:</strong>
            </InputWithLabel>
            <button type="submit" disabled={!searchTerm}>
                Submit
            </button>
        </form>
    );
};

export default SearchForm;