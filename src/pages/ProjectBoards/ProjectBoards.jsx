import React, { useEffect } from "react";
import { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import ScrollContainer from "react-indiana-drag-scroll";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
    clearBoardColumn,
    getBoardAction,
    updateColumnItemPositionAction,
} from "../../redux/actions/boardsActions";
import { Link, useParams } from "react-router-dom";

import ProjectBoardColumn from "../../components/ProjectBoardColumn/ProjectBoardColumn";
import { FaChevronLeft, FaSpinner } from "react-icons/fa";

const ProjectBoards = () => {
    const { user } = useSelector((state) => state.userAuthState);
    const { board, columns, isLoadingBoard } = useSelector(
        (state) => state.boardsState
    );

    const [boardData, setBoardData] = useState(columns);

    const dispatch = useDispatch();
    const { boardId } = useParams();

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

        const { source, destination, draggableId } = re;

        const from = boardData[parseInt(source.droppableId)]._id;
        const to = boardData[parseInt(destination.droppableId)]._id;
        const index = destination.index;
        const itemId = draggableId;

        if (
            source.droppableId !== destination.droppableId ||
            (source.droppableId === destination.droppableId &&
                source.index !== destination.index)
        ) {
            await dispatch(
                updateColumnItemPositionAction({
                    from,
                    to,
                    index,
                    itemId,
                })
            );
        }
    };

    useEffect(() => {
        dispatch(getBoardAction(boardId, { investorId: user.type && user.type === "subuser"? user.investorId : user?._id }));
    }, [dispatch, user?._id, boardId, user.type, user.investorId]);

    useEffect(() => {
        setBoardData(columns);
    }, [columns]);

    useEffect(() => {
        return () => dispatch(clearBoardColumn());
    }, [dispatch]);

    return (
        <DashboardWrapper
            title={`Project Boards - ${(board._id && board.name) || ""}`}
        >
            {isLoadingBoard && (
                <div>
                    <FaSpinner className="animate-spin mt-4 dark:text-white" />
                </div>
            )}
            <div className="mt-4">
                <Link to="/project-boards" className="flex items-center space-x-1 text-brown-color dark:text-white text-sm">
                    <FaChevronLeft className="text-xs " /> <span>All Boards</span>
                </Link>
            </div>
            <ScrollContainer
                ignoreElements=".board-item"
                className="
      my-4 flex space-x-8 overflow-x-auto board-container select-none  
      "
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    {boardData.map((board, idx) => (
                        <div
                            key={board.name}
                            className="board min-w-[200px] sm:min-w-[280px] max-w-[280px] bg-white dark:bg-gray-primary-color p-2 flex flex-col max-h-[900px] overflow-y-auto rounded-3xl"
                        >
                            <Droppable droppableId={idx.toString()}>
                                {(provided, snapshot) => (
                                    <div
                                        className="board-item pb-16 w-full"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <ProjectBoardColumn
                                            boardId={boardId}
                                            board={board}
                                        />
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
