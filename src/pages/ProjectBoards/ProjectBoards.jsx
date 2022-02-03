import React from "react";
import { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";

const ProjectBoards = () => {
  const [selectedBoard, ] = useState("Board 1");
  return (
    <DashboardWrapper
      title={`Project Boards - ${selectedBoard && selectedBoard}`}
    >
      <div className="my-10 flex overflow-y-auto">
        <div className="board bg-white p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl">
          <h2 className="text-md font-light ml-3 fo text-dark-color">
            Column 1
          </h2>
          <hr className="border-0 h-[2px] my-2 mb-16 opacity-50 border-dark-color bg-dark-color" />

          <div className="w-72">
            <HomeCard />
          </div>
          <div className="w-72">
            <HomeCard />
          </div>
          <div className="w-72">
            <HomeCard />
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ProjectBoards;
