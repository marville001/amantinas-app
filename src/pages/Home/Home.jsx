import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

const Home = () => {
  return (
    <DashboardWrapper>
      <div className="my-10">
        <div className="grid space-y-5 lg:space-y-0 grid-cols-1 lg:grid-cols-4 lg:gap-5">
          <div className="bg-white px-8 py-6 col-span-3 rounded-xl">
            <h2 className="text-lg mb-2">Cash Flow</h2>
            <hr className="border-[1px] my-5 opacity-50 border-dark-color bg-dark-color" />
          </div>
          <div className="bg-white p-8 rounded-xl">Two</div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Home;
