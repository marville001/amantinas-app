import React, { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";

import { HiViewList, HiViewGrid } from "react-icons/hi";

const ScrapedHomes = () => {
  const [viewType, setViewType] = useState("cards");

  return (
    <DashboardWrapper title="Scraping Homes">
      <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
        <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
          Scraping Homes
        </h2>
        <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

        <div className="py-4 flex justify-end px-12 items-center space-x-2">
          <div
            className={`${
              viewType === "cards" &&
              "bg-primary-blue text-white p-1 rounded-md"
            }`}
          >
            <HiViewGrid
              onClick={() => setViewType("cards")}
              className={`${
                viewType === "list" && "cursor-pointer text-xl text-dark-color"
              }`}
            />
          </div>
          <div
            className={`${
              viewType === "list" && "bg-primary-blue text-white p-1 rounded-md"
            }`}
          >
            <HiViewList
              onClick={() => setViewType("list")}
              className={`${
                viewType === "cards" && "cursor-pointer text-xl text-dark-color"
              }`}
            />
          </div>
        </div>

        {viewType === "cards" ? (
          <div className="px-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
            <HomeCard />
          </div>
        ) : (
          <div className="px-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
            <h4>List</h4>
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default ScrapedHomes;
