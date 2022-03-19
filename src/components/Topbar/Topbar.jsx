import React from "react";

import { HiOutlineBell, HiMenuAlt2, HiSun, HiMoon } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import useDarkMode from "../../hooks/useDarkMode";
import { SIDEBAR } from "../../redux/types";

const Topbar = ({ title = "Welcome, User" }) => {
    const { sidebarOpen } = useSelector((state) => state.appState);
    const dispatch = useDispatch();
    const type = sidebarOpen ? SIDEBAR.CLOSE : SIDEBAR.OPEN;

    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    return (
        <div className="bg-white dark:bg-gray-primary-color py-4 rounded px-4">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <HiMenuAlt2
                        onClick={() => {
                            dispatch({ type });
                        }}
                        className="lg:hidden text-2xl font-bold text-dark-blue-color dark:text-white mr-4 cursor-pointer"
                    />
                    <h2 className="font-bold text-dark-blue-color dark:text-white text-2xl">
                        {title}
                    </h2>
                </div>
                <div className="flex items-center space-x-5">
                    <div className="relative">
                        <HiOutlineBell className="font-medium text-2xl  dark:text-white" />
                        <div className="absolute right-1 top-1 h-[6px] w-[6px] bg-sky-blue  rounded-full"></div>
                    </div>

                    <div
                        onClick={handleMode}
                        className="relative cursor-pointer"
                    >
                        {darkTheme ? (
                            <HiSun className="font-medium text-2xl text-white" />
                        ) : (
                            <HiMoon className="font-medium text-2xl" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
