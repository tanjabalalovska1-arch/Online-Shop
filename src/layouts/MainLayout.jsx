import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/shop">Shop</NavLink>

        <NavLink to="/about">About Us</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
