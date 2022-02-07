import React from "react";
import { useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";
import ListCard from "../../components/ListCard/ListCard";
import ViewTypeHeader from "../../components/ViewTypeHeader/ViewTypeHeader";

const ArchivedData = () => {
  const { viewType } = useSelector((state) => state.appState);
  return (
    <DashboardWrapper title="Archived Data">
      <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
        <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
          Archived Data
        </h2>
        <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

        <ViewTypeHeader />

        {viewType === "cards" ? (
          <div className="px-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
            <HomeCard />
            <HomeCard />
            <HomeCard />
          </div>
        ) : (
          <div className="px-12 flex flex-col space-y-2">
            <ListCard />
            <ListCard />
            <ListCard />
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default ArchivedData;
