import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-svh">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;
