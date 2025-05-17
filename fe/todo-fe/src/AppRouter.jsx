import { Routes, Route, Outlet, Link, NavLink, useParams, } from 'react-router';

const AppRouter = () =>
{
    const users = [
        { id: '1', fullName: 'Robin Wieruch' },
        { id: '2', fullName: 'Sarah Finnley' },
    ];

    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="users" element={<Users users={users} />}>
                        <Route path=":userId" element={<User />} />
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
    return (
        <>
            <h2>Users</h2>

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.fullName}</Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </>
    );
};
const User = () =>
{
    const { userId } = useParams();

    return (
        <>
            <h2>User: {userId}</h2>

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