import React, { useEffect } from "react";
import { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import ScrollContainer from "react-indiana-drag-scroll";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getBoardAction } from "../../redux/actions/boardsActions";
import { useParams } from "react-router-dom";

import ProjectBoardColumn from "../../components/ProjectBoardColumn/ProjectBoardColumn";

const ProjectBoards = () => {
    const { user } = useSelector((state) => state.userAuthState);
    const { board, columns } = useSelector((state) => state.boardsState);

    const [boardData, setBoardData] = useState(columns);

    const dispatch = useDispatch();
    const { boardId } = useParams();

    const onDragEnd = (re) => {
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
    };

    useEffect(() => {
        dispatch(getBoardAction(boardId, { investorId: user?._id }));
    }, [dispatch, user?._id, boardId]);

    useEffect(() => {
        setBoardData(columns);
    }, [columns]);

    return (
        <DashboardWrapper title={`Project Boards - ${(board._id && board.name) || ""}`}>
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
                                    <ProjectBoardColumn
                                        board={board}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    />
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
