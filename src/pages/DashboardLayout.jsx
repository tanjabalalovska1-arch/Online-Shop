import { NavLink, Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="dashboard">
      <aside className="dashboard-sidebar">
        <h2>My Dashboard</h2>
        <nav>
          <NavLink to="/dashboard" end>Home</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </nav>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome to Olivé</h1>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>

        <footer className="dashboard-footer">
          Olivé Dashboard
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;