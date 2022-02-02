import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const DashboardWrapper = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div>
        <Topbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
