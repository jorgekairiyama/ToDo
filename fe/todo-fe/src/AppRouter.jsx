import { useState } from "react";
import { Routes, Route, Outlet, Link, NavLink, useParams, useNavigate, useSearchParams, } from 'react-router';

const AppRouter = () =>
{
    const navigate = useNavigate();
    const [users, setUsers] = useState([
        { id: '1', fullName: 'Robin Wieruch' },
        { id: '2', fullName: 'Sarah Finnley' },
    ]);

    const handleRemoveUser = (userId) =>
    {
        setUsers((state) => state.filter((user) => user.id !== userId));
        navigate('/users');
    };

    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={<Users users={users} />}>
                        <Route
                            path=":userId"
                            element={<User onRemoveUser={handleRemoveUser} />}
                        />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </>
    );
};

const Navigation = () =>
{
    return (
        <nav
            style={{
                borderBottom: "solid 2px",
                paddingBottom: "1rem",
            }}
        >
            <Link to="/home">Home</Link>
            &nbsp;
            <Link to="/users">Users</Link>
        </nav>
    );
};

export default AppRouter;

const Home = () =>
{
    return (
        <>
            <h2>Home</h2>
        </>
    );
};

const Users = ({ users }) =>
{
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTerm = searchParams.get('name') || '';

    const handleSearch = (event) =>
    {
        const name = event.target.value;

        if (name)
        {
            setSearchParams({ name: event.target.value });
        } else
        {
            setSearchParams({});
        }
    };
    return (
        <>
            <h2>Users</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {users
                    .filter((user) =>
                        user.fullName
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                    )
                    .map((user) => (
                        <li key={user.id}>
                            <Link to={user.id}>{user.fullName}</Link>
                        </li>
                    ))}
            </ul>
            <Outlet />
        </>
    );
};
const User = ({ onRemoveUser }) =>
{
    const { userId } = useParams();

    return (
        <>
            <h2>User: {userId}</h2>
            <button type="button" onClick={() => onRemoveUser(userId)}>
                Remove
            </button>
            <Link to="/users">Back to Users</Link>
        </>
    );
};
const NoMatch = () =>
{
    return (<p>There's nothing here: 404!</p>);
}

const Layout = () =>
{
    const style = ({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
    });

    return (
        <>
            <h1>React Router</h1>

            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
                <NavLink to="/" style={style}>Home</NavLink>
                &nbsp;
                <NavLink to="/users" style={style}>Users</NavLink>
            </nav>

            <main style={{ padding: "5rem 0" }}>
                <Outlet />
            </main>
        </>
    );
};