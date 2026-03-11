import Navbar from "../components/Navbar";

import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    
    </div>
  );
};

export default DashLayout;