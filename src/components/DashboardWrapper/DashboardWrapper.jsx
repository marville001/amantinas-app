import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const DashboardWrapper = ({ children, title }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="pl-[320px] flex-1 px-6 py-8 overflow-hidden">
        <Topbar title={title} />
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
