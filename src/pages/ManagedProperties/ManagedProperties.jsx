import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";

const ManagedProperties = () => {
  return (
    <DashboardWrapper title="Managed Properties">
      <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
        <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
          Managed Properties
        </h2>
        <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

        <div className=" px-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-16">
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ManagedProperties;
