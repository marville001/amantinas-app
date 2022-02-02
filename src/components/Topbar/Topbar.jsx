import React from "react";

import { HiOutlineBell } from "react-icons/hi";

const Topbar = ({text="Welcome, User"}) => {
  return (
    <div className="bg-white py-4 rounded px-4">
      <div className="flex justify-between">
        <h2 className="font-bold text-dark-color text-2xl">{text}</h2>
        <div className="relative">
          <HiOutlineBell className="font-medium text-2xl" />
          <div className="absolute right-1 top-1 h-[6px] w-[6px] bg-sky-blue rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
