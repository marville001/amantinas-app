import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const DashboardWrapper = ({ children, title }) => {
  const { sidebarOpen } = useSelector((state) => state.appState);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className={`${
          sidebarOpen ? "lg:pl-[320px]":""
        } flex-1 px-6 py-8 overflow-hidden duration-300 transition-all ease-linear`}
      >
        <Topbar title={title} />
        {children}
      </div>
    </div>
  );
};

export default DashboardWrapper;
