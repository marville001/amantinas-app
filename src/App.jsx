import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Ledger from "./pages/Ledger/Ledger";
import ScrapingTool from "./pages/ScrapingTool/ScrapingTool";
import ScrapedHomes from "./pages/ScrapedHomes/ScrapedHomes";
import Prospects from "./pages/Prospects/Prospects";
import ActiveOffers from "./pages/ActiveOffers/ActiveOffers";
import ManagedProperties from "./pages/ManagedProperties/ManagedProperties";
import ArchivedData from "./pages/ArchivedData/ArchivedData";
import Users from "./pages/Users/Users";
import ProjectBoards from "./pages/ProjectBoards/ProjectBoards";
import { useDispatch } from "react-redux";
import { SIDEBAR } from "./redux/types";
import SuggestionsBoard from "./pages/SuggestionsBoard/SuggestionsBoard";
import AdminHome from "./admin/pages/AdminHome";
import AdminSuggestionsBoard from "./admin/pages/AdminSuggestionsBoard";
import AdminLogin from "./admin/pages/AdminLogin";
import ProjectsBoardListing from "./pages/ProjectBoards/ProjectsBoardListing";
import UsersActivity from "./pages/UsersActivity/UsersActivity";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (document.body.clientWidth < 1024) {
      dispatch({ type: SIDEBAR.CLOSE });
    }
    window.addEventListener("resize", (e) => {
      let width = document.body.clientWidth;
      if (width < 1024) {
        dispatch({ type: SIDEBAR.CLOSE });
      } else {
        dispatch({ type: SIDEBAR.OPEN });
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [dispatch]);

  return (
    <div className="bg-[#effafb] min-h-screen max-w-[1560px] mx-auto">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Navigate to="/" />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/ledger" element={<Ledger />} />
        <Route exact path="/scraping-tool" element={<ScrapingTool />} />
        <Route exact path="/scraped-homes" element={<ScrapedHomes />} />
        <Route exact path="/prospects" element={<Prospects />} />
        <Route exact path="/active-offers" element={<ActiveOffers />} />
        <Route
          exact
          path="/managed-properties"
          element={<ManagedProperties />}
        />
        <Route exact path="/archived-data" element={<ArchivedData />} />
        <Route exact path="/users-activities" element={<UsersActivity />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/project-boards" element={<ProjectsBoardListing />} />
        <Route exact path="/project-boards/:boardId" element={<ProjectBoards />} />
        <Route exact path="/suggestions-boards" element={<SuggestionsBoard />} />
        <Route exact path="/admin" element={<AdminHome />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin/users" element={<AdminHome />} />
        <Route exact path="/admin/suggestions-boards" element={<AdminSuggestionsBoard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
