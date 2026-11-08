import { Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const { pathname } = useLocation();

  const pageOwnsMain =
    pathname === "/" || pathname === "/login" || pathname === "/register";

  const MainWrapper = pageOwnsMain ? "div" : "main";

  return (
    <MainWrapper className="main-content">
      <Outlet />
    </MainWrapper>
  );
}

export default MainLayout;
