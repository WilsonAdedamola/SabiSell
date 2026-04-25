import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const StoreLayout = () => {
  return (
    <main className="flex-1 flex flex-col min-h-0 relative w-full">
      <Outlet />
    </main>
  );
};

export default StoreLayout;
