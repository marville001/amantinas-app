import React from "react";
import { Link } from "react-router-dom";
import CashFlowChart from "../../components/CashFlowChart/CashFlowChart";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { useState } from "react";
import AddBoardModal from "../../components/Modals/AddBoardModal";

const Home = () => {
  const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
  return (
    <DashboardWrapper>
      <div className="my-6">
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

        <div className="flex my-6 gap-5 justify-end">
          <div className="bg-white p-4 flex-1 lg:flex-none lg:min-w-[280px] rounded-xl">
            <h2 className="text-md mb-2 text-center font-bold text-dark-color">
              Project Boards
            </h2>
            <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

            <div
              onClick={() => setNewBoardModalOpen(true)}
              className="flex cursor-pointer items-center justify-center w-full pt-6 text-primary-blue"
            >
              <HiOutlinePlusCircle className="w-24 h-24" />
            </div>
          </div>
          <div className="bg-white p-4 flex-1 lg:flex-none py-4 lg:min-w-[280px] rounded-xl">
            <h2 className="text-md mb-2 text-center font-bold text-dark-color">
              Time
            </h2>
            <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

            <div className="flex flex-col items-center my-4 mx-6">
              <button className="bg-primary-blue p-2 px-10 w-full text-white rounded-xl uppercase text-xs">
                Time In
              </button>
              <h4 className="text-3xl my-2 text-brown-color ">15:37:00</h4>
              <Link
                to="/my-activities"
                className="text-center bg-primary-blue p-2 px-10 w-full text-white rounded-xl uppercase text-xs"
              >
                View Activities
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AddBoardModal
        title={"New Board"}
        size="lg"
        isOpen={newBoardModalOpen}
        closeModal={() => setNewBoardModalOpen(false)}
      />
    </DashboardWrapper>
  );
};

export default Home;
