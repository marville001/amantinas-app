import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";
import CashFlowChart from "../../components/CashFlowChart/CashFlowChart";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import ListCard from "../../components/ListCard/ListCard";
import ViewTypeHeader from "../../components/ViewTypeHeader/ViewTypeHeader";
import { useSelector } from "react-redux";

const ManagedProperties = () => {
  const { viewType } = useSelector((state) => state.appState);
  return (
    <DashboardWrapper title="Managed Properties">
      <div className="my-8 p-10 max-w-2xl bg-white rounded-xl mx-auto">
        <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
          Overview
        </h2>
        <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

        <div className="my-6 flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-3">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <p className="text-dark-color font-medium">From</p>
            <CustomDatePicker />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <p className="text-dark-color font-medium">To</p>
            <CustomDatePicker />
          </div>
        </div>
        <div className="h-64 w-full pb-10">
          <CashFlowChart />
          <hr />
        </div>
      </div>
      <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
        <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
          Managed Properties
        </h2>
        <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

        <ViewTypeHeader />

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
          <div className="md:px-12 flex flex-col space-y-2">
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
            <ListCard />
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default ManagedProperties;
