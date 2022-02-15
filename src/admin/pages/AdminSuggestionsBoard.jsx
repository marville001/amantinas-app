import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { loadSuggestionsAction, suggestionDragAction } from '../../redux/actions/suggestionsActions';
import SuggestionBoardCard from '../components/SuggestionBoardCard';
import DashboardWrapper from '../Wrapper'

const AdminSuggestionsBoard = () => {
    const { suggestions } = useSelector((state) => state.suggestionsState);

    const [suggModalOpen, setSuggModalOpen] = useState(false);
    const [boardData, setBoardData] = useState([]);

    const dispatch = useDispatch();

    const onDragEnd = async (re) => {
        if (!re.destination) return;
        let newBoardData = boardData;
        var dragItem =
            newBoardData[parseInt(re.source.droppableId)].items[
                re.source.index
            ];
        newBoardData[parseInt(re.source.droppableId)].items.splice(
            re.source.index,
            1
        );

        newBoardData[parseInt(re.destination.droppableId)].items.splice(
            re.destination.index,
            0,
            dragItem
        );
        setBoardData(newBoardData);

        const columns = ["opinion", "planned", "progress"];
        const destIndex = parseInt(re.destination.droppableId);
        const column = columns[destIndex];

        await dispatch(
            suggestionDragAction({ column, suggestionId: dragItem._id }, "admin")
        );

        console.log(column);
    };

    useEffect(() => {
        dispatch(loadSuggestionsAction("admin"));
    }, [dispatch]);

    useEffect(() => {
        if (suggestions.length > 0) {
            const opinion = suggestions.filter(
                (sug) => sug.column === "opinion"
            );
            const planned = suggestions.filter(
                (sug) => sug.column === "planned"
            );
            const progress = suggestions.filter(
                (sug) => sug.column === "progress"
            );

            const data = [
                {
                    id: "opinion",
                    name: "Need Your Opinion",
                    items: [...opinion],
                },
                {
                    id: "planned",
                    name: "Planned",
                    items: [...planned],
                },
                {
                    id: "progress",
                    name: "In Progress",
                    items: [...progress],
                },
            ];

            setBoardData(data);
        }
    }, [suggestions]);
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

            {/* {loading && (
                <div className="flex justify-center my-4">
                    <FaSpinner className="animate-spin mr-4 text-2xl" />
                </div>
            )} */}

            <ScrollContainer
                ignoreElements=".board-item"
                className="
      my-10 flex space-x-8 overflow-x-auto board-container select-none  
      "
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    {[...boardData].map((board, idx) => (
                        <div
                            key={board.name}
                            className="board flex-1 min-w-[200px] sm:min-w-[300px] bg-white p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl"
                        >
                            <Droppable droppableId={idx.toString()}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="h-full pb-16"
                                    >
                                        <h2 className="text-md text-center py-3 font-light ml-3 fo text-dark-color">
                                            {board.name}
                                        </h2>
                                        <hr className="border-0 h-[2px] my-2 mb-8 opacity-50 border-dark-color bg-dark-color" />
                                        {board.items.length > 0 &&
                                            board.items.map((item, idx) => (
                                                <Draggable
                                                    index={idx}
                                                    draggableId={item._id.toString()}
                                                    key={item._id}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            className="board-item"
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <SuggestionBoardCard
                                                                item={item}
                                                            />
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

            {/* <SuggestionModal
                isOpen={suggModalOpen}
                closeModal={() => setSuggModalOpen(false)}
            /> */}
        </DashboardWrapper>
  )
}

export default AdminSuggestionsBoard