import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const DashboardWrapper = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="px-[320px] flex-1 py-8 px-6">
        <Topbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
