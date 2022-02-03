import React from "react";
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

const App = () => {
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
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/project-boards" element={<ProjectBoards />} />
      </Routes>
    </div>
  );
};

export default App;
