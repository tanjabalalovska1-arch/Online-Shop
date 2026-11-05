import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <nav className="navbar">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          Shop
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          About Us
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
