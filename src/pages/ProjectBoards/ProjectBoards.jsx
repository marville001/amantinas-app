import React from "react";
import { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import BoardCard from "../../components/BoardCard/BoardCard";
import ScrollContainer from "react-indiana-drag-scroll";

const ProjectBoards = () => {
  const [selectedBoard] = useState("Board 1");
  return (
    <DashboardWrapper
      title={`Project Boards - ${selectedBoard && selectedBoard}`}
    >
      <ScrollContainer
        className="
      my-10 flex space-x-8 overflow-x-scroll board-container   
      "
      >
        <div className="board min-w-[300px] bg-white p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl">
          <h2 className="text-md font-light ml-3 fo text-dark-color">
            Column 1
          </h2>
          <hr className="border h-[2px] my-2 mb-8 opacity-50 border-dark-color bg-dark-color" />

          <div className="w-[90%] mx-auto">
            <BoardCard />
          </div>
          <div className="w-[90%] mx-auto my-6">
            <BoardCard />
          </div>
          <div className="w-[90%] mx-auto my-6">
            <BoardCard />
          </div>
        </div>

        <div className="board min-w-[300px] bg-white p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl">
          <h2 className="text-md font-light ml-3 fo text-dark-color">
            Column 2
          </h2>
          <hr className="border-0 h-[2px] my-2 mb-8 opacity-50 border-dark-color bg-dark-color" />

          <div className="w-[90%] mx-auto">
            <BoardCard />
          </div>
        </div>

        <div className="board min-w-[300px] bg-white p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl">
          <h2 className="text-md font-light ml-3 fo text-dark-color">
            Column 3
          </h2>
          <hr className="border-0 h-[2px] my-2 mb-8 opacity-50 border-dark-color bg-dark-color" />

          <div className="w-[90%] mx-auto">
            <BoardCard />
          </div>
          <div className="w-[90%] mx-auto my-6">
            <BoardCard />
          </div>
        </div>

        <div className="board min-w-[300px] bg-white p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl">
          <h2 className="text-md font-light ml-3 fo text-dark-color">
            Column 1
          </h2>
          <hr className="border-0 h-[2px] my-2 mb-8 opacity-50 border-dark-color bg-dark-color" />
        </div>
      </ScrollContainer>
    </DashboardWrapper>
  );
};

export default ProjectBoards;
