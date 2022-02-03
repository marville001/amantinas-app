import React from "react";
import CashFlowChart from "../../components/CashFlowChart/CashFlowChart";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

const Home = () => {
  return (
    <DashboardWrapper>
      <div className="my-10">
        <div className="grid space-y-5 lg:space-y-0 grid-cols-1 lg:grid-cols-4 lg:gap-5">
          <div className="bg-white px-8 py-6 col-span-3 rounded-xl">
            <h2 className="text-lg mb-2">Cash Flow</h2>
            <hr className="border-0 h-[2px] my-5 opacity-50 border-dark-color bg-dark-color" />
            <h2 className="text-[#0E5359] my-6">Overview</h2>
            <div className="flex lg:divide-x-2 flex-col lg:flex-row">
              <div className="flex-1 p-4">
                <p className="text-[#666666] text-[13px]">Net Cashflow YTD</p>
                <div className="text-dark-color mt-2 font-bold text-3xl">
                  $20,760
                </div>
              </div>
              <div className="flex-1 lg:pl-6 p-4">
                <p className="text-[#666666] text-[13px]">Revenue YTD</p>
                <div className="text-dark-color mt-2 font-bold text-3xl">
                  $108,600
                </div>
              </div>
              <div className="flex-1  lg:pl-6 p-4">
                <p className="text-[#666666] text-[13px]">Expense YTD</p>
                <div className="text-dark-color mt-2 font-bold text-3xl">
                  $87,840
                </div>
              </div>
            </div>
            <div className="h-64 w-full pb-10 mt-8">
              <h2 className="text-[#0E5359]">Monthly Cash Flow</h2>
              <br />
              <CashFlowChart />
              <hr />
            </div>
          </div>
          <div className="bg-white px-8 py-6 rounded-xl">
            <h2 className="text-lg mb-2 font-bold text-dark-color">
              Portfolio Metrics
            </h2>
            <hr className="border-0 h-[2px] my-5 opacity-50 border-dark-color bg-dark-color" />
            <div className="my-16 flex flex-col space-y-4">
              <div className="flex justify-between">
                <h3 className="text-brown-color">Income</h3>
                <div className="text-md font-bold text-dark-color">20,760</div>
              </div>
              <div className="flex justify-between">
                <h3 className="text-brown-color">Expernse</h3>
                <div className="text-md font-bold text-dark-color">87,840</div>
              </div>
            </div>

            <h2 className="text-lg mb-2 font-bold text-dark-color">
              Core Metrics
            </h2>
            <hr className="border-0 h-[2px] my-5 opacity-50 border-dark-color bg-dark-color" />
            <div className="my-10 flex flex-col space-y-4">
              <div className="flex justify-between">
                <h3 className="text-brown-color">Scraped Homes</h3>
                <div className="text-md font-bold text-dark-color">93</div>
              </div>
              <div className="flex justify-between">
                <h3 className="text-brown-color">Active Offers</h3>
                <div className="text-md font-bold text-dark-color">7</div>
              </div>
              <div className="flex justify-between">
                <h3 className="text-brown-color">Deals Lost</h3>
                <div className="text-md font-bold text-dark-color">3</div>
              </div>
              <div className="flex justify-between">
                <h3 className="text-brown-color">Managed Homes</h3>
                <div className="text-md font-bold text-dark-color">4</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Home;
