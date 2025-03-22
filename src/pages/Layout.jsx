import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="bg-[#FDFAF6] min-h-screen w-full">
      <Outlet />
      <Sidebar />
    </div>
  );
};

export default Layout;
