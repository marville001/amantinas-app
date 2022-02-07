import React from "react";
import { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import BoardCard from "../../components/BoardCard/BoardCard";
import ScrollContainer from "react-indiana-drag-scroll";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

const initialData = [
  {
    name: "Backlog",
    items: [
      {
        id: 1,
        title: "Company website redesign.",
      },
      {
        id: 2,
        title: "Mobile app login process prototype.",
      },
    ],
  },
  {
    name: "In Progress",
    items: [
      {
        id: 3,
        title: "Research and strategy for upcoming project.",
      },
    ],
  },
  {
    name: "In Review",
    items: [
      {
        id: 4,
        title: "Dashboard layout redesign.",
      },
      {
        id: 5,
        title: "Social media posts",
      },
    ],
  },
  {
    name: "Completed",
    items: [
      {
        id: 6,
        title: "Review client spec document and give feedback.",
      },
      {
        id: 7,
        title: "Navigation designs",
      },
      {
        id: 8,
        title: "Create style guide based on previous feedback",
      },
    ],
  },
];

const ProjectBoards = () => {
  const [boardData, setBoardData] = useState(initialData);
  const [selectedBoard] = useState("Board 1");
  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    console.log({ dragItem, dest: re.destination });
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };
  return (
    <DashboardWrapper
      title={`Project Boards - ${selectedBoard && selectedBoard}`}
    >
      <ScrollContainer
        ignoreElements=".board-item"
        className="
      my-10 flex space-x-8 overflow-x-auto board-container select-none  
      "
      >
        <DragDropContext onDragEnd={onDragEnd}>
          {boardData.map((board, idx) => (
            <div
              key={board.name}
              className="board min-w-[200px] sm:min-w-[300px] bg-white p-2 flex flex-col pb-16 max-h-[900px] overflow-y-auto rounded-3xl"
            >
              <Droppable droppableId={idx.toString()}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2 className="text-md font-light ml-3 fo text-dark-color">
                      {board.name}
                    </h2>
                    <hr className="border-0 h-[2px] my-2 mb-8 opacity-50 border-dark-color bg-dark-color" />
                    {board.items.length > 0 &&
                      board.items.map((item, idx) => (
                        <Draggable
                          index={idx}
                          draggableId={item.id.toString()}
                          key={item.id}
                          className="w-[90%] mx-auto"
                        >
                          {(provided) => (
                            <div
                              className="board-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <BoardCard />
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </ScrollContainer>
    </DashboardWrapper>
  );
};

export default ProjectBoards;
