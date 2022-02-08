import { useState } from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import ScrollContainer from "react-indiana-drag-scroll";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import SuggestionModal from "../../components/Modals/SuggestionModal";
import SuggestionBoardCard from "../../components/SuggestionBoardCard/SuggestionBoardCard";

const initialData = [
  {
    name: "Need Your Opinion",
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
    name: "Planned",
    items: [
      {
        id: 3,
        title: "Research and strategy for upcoming project.",
      },
    ],
  },
  {
    name: "In Progress",
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
];

const SuggestionsBoard = () => {
  const [suggModalOpen, setSuggModalOpen] = useState(false);
  const [boardData, setBoardData] = useState(initialData);

  console.log({ boardData });

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
    <DashboardWrapper title={`Suggestions`}>
      <div className="flex justify-end my-4">
        <button
          onClick={() => setSuggModalOpen(true)}
          className="px-8 py-2 bg-primary-blue rounded-lg text-white uppercase"
        >
          Submit Suggestion
        </button>
      </div>

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
              className="board flex-1 min-w-[200px] sm:min-w-[300px] bg-white p-2 flex flex-col pb-16 max-h-[900px] overflow-y-auto rounded-3xl"
            >
              <Droppable droppableId={idx.toString()}>
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <h2 className="text-md font-light ml-3 fo text-dark-color">
                      {board.name} - {board.name}
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
                              <SuggestionBoardCard />
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
      
      <SuggestionModal
        isOpen={suggModalOpen}
        closeModal={() => setSuggModalOpen(false)}
      />
    </DashboardWrapper>
  );
};

export default SuggestionsBoard;
