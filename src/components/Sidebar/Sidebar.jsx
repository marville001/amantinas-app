import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineViewGrid, HiOutlineXCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SIDEBAR } from "../../redux/types";
import SuggestionModal from "../Modals/SuggestionModal";

const SideLink = ({ to = "/home", icon: Icon, text }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  return (
    <Link
      onClick={() => {
        if (document.body.clientWidth < 1024) {
          dispatch({ type: SIDEBAR.CLOSE });
        }
      }}
      to={to}
      className={`${
        pathname === to ? "bg-primary-blue" : "bg-slate-100 "
      } px-4 py-3 rounded-md flex items-center space-x-3 overflow-hidden relative group`}
    >
      <div
        className={`${
          pathname === to ? "left-0" : " -left-2 group-hover:left-0"
        } bg-sky-blue transition-all ease-in-out duration-200 absolute inset-y-0 w-2`}
      ></div>
      <Icon
        className={`${
          pathname === to ? "text-white" : "text-primary-blue"
        } text-2xl`}
      />
      <span
        className={`${
          pathname === to ? "text-white" : "text-primary-blue"
        } tracking-wider  text-sm font-bold`}
      >
        {text}
      </span>
    </Link>
  );
};

const Sidebar = () => {
  const { sidebarOpen } = useSelector((state) => state.appState);

  const [suggModalOpen, setSuggModalOpen] = useState(false);

  const dispatch = useDispatch();

  return (
    <div
      className={`w-[300px] fixed ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }  overflow-y-auto h-screen bg-dark-color px-8 py-6 sidebar duration-300 transition-all ease-linear z-10`}
    >
      <div className="flex items-center justify-center space-x-5 relative">
        {/* <div className="bg-sky-blue rounded-full w-8 h-8 grid place-items-center font-normal text-2xl text-white">
          A
        </div> */}
        <span className="text-sky-blue text-xl">Project Real Estate</span>
        <HiOutlineXCircle
          onClick={() => {
            dispatch({ type: SIDEBAR.CLOSE });
          }}
          className="lg:hidden text-2xl font-bold text-primary-blue absolute -right-5 mr-4 cursor-pointer"
        />
      </div>

      {/* List links */}
      <div className="my-12 flex flex-col space-y-8">
        <SideLink to="/home" icon={HiOutlineViewGrid} text="Home" />
        <SideLink to="/ledger" icon={HiOutlineViewGrid} text="Ledger" />
        <SideLink
          to="/scraping-tool"
          icon={HiOutlineViewGrid}
          text="Scraping tool"
        />
        <SideLink
          to="/scraped-homes"
          icon={HiOutlineViewGrid}
          text="Scraped homes"
        />
        <SideLink to="/prospects" icon={HiOutlineViewGrid} text="Prospects" />
        <SideLink
          to="/active-offers"
          icon={HiOutlineViewGrid}
          text="Active offers"
        />
        <SideLink
          to="/managed-properties"
          icon={HiOutlineViewGrid}
          text="Managed Properties"
        />
        <SideLink
          to="/archived-data"
          icon={HiOutlineViewGrid}
          text="Archived data"
        />
        <SideLink to="/users" icon={HiOutlineViewGrid} text="Users" />
        <SideLink
          to="/project-boards"
          icon={HiOutlineViewGrid}
          text="Project Boards"
        />

        <div
          onClick={() => {
            if (document.body.clientWidth < 1024) {
              dispatch({ type: SIDEBAR.CLOSE });
            }

            setSuggModalOpen(true);
          }}
          className={`bg-white active:bg-primary-blue px-8 py-3 rounded-md cursor-pointer flex items-center space-x-3 overflow-hidden relative group`}
        >
          <HiOutlineViewGrid
            className={`text-primary-blue group-active:text-white text-2xl`}
          />
          <span
            className={`text-primary-blue tracking-wider group-active:text-white  text-sm font-bold`}
          >
            Suggestions
          </span>
        </div>
      </div>
      <SuggestionModal
        isOpen={suggModalOpen}
        closeModal={() => setSuggModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;

<h3>Sidebar</h3>;
