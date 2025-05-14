export const Navigation = () =>
{
    return (
        <nav
            style={{
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
            }}
        >
            <Link to="/home">Search</Link>
            <Link to="/users">Add</Link>
        </nav>
    );
};
