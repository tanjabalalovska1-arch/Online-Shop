
import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div>
      <h1>My Dashboard</h1>

      <nav>
        <NavLink to="/dashboard">Home</NavLink>
        {" | "}
        <NavLink to="/dashboard/settings">Settings</NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

export default DashboardLayout;
