import React from "react";

import { HiOutlineBell, HiMenuAlt2 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { SIDEBAR } from "../../redux/types";

const Topbar = ({ title = "Welcome, User" }) => {
  const { sidebarOpen } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const type = sidebarOpen ? SIDEBAR.CLOSE : SIDEBAR.OPEN;

  return (
    <div className="bg-white py-4 rounded px-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <HiMenuAlt2
            onClick={() => {
              dispatch({ type });
            }}
            className="lg:hidden text-2xl font-bold text-dark-color mr-4 cursor-pointer"
          />
          <h2 className="font-bold text-dark-color text-2xl">{title}</h2>
        </div>
        <div className="relative">
          <HiOutlineBell className="font-medium text-2xl" />
          <div className="absolute right-1 top-1 h-[6px] w-[6px] bg-sky-blue rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
