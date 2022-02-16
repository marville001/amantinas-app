import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaSpinner } from "react-icons/fa";
import { HiPencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
    getBoardAction,
    updateColumnNameAction,
} from "../../redux/actions/boardsActions";
import BoardCard from "../BoardCard/BoardCard";

const ProjectBoardColumn = ({ boardId, board, ...props }) => {
    const { user } = useSelector((state) => state.userAuthState);
    const { isUpdatingColumnName } = useSelector((state) => state.boardsState);

    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState(board.name);

    const dispatch = useDispatch();

    const inputRef = useRef();

    const handleSaveName = async () => {
        await dispatch(updateColumnNameAction(board._id, { name }));
        await dispatch(getBoardAction(boardId, { investorId: user?._id }));
    };
    return (
        <div {...props}>
            {isEditingName ? (
                <div className="flex px-2">
                    <input
                        value={name}
                        ref={inputRef}
                        onChange={(e) => setName(e.target.value)}
                        className="p-1 text-xs !rounded-md !rounded-r-none"
                        type="text"
                    />
                    <button
                        onClick={handleSaveName}
                        className="bg-dark-color text-xs p-2 py-1 text-white"
                    >
                        {isUpdatingColumnName ? <FaSpinner /> : "Save"}
                    </button>
                    <button
                        onClick={() => setIsEditingName(false)}
                        className="bg-red-300 text-xs p-2 py-1 text-white rounded-r-md"
                    >
                        X
                    </button>
                </div>
            ) : (
                <div className="flex justify-between items-center group">
                    <h2 className="text-md font-light ml-3 fo text-dark-color">
                        {board.name}
                    </h2>
                    <HiPencil
                        onClick={() => {
                            setIsEditingName(true);
                            inputRef.current && inputRef.current.focus();
                        }}
                        className="mr-4 hidden group-hover:block font-bold text-xl cursor-pointer"
                    />
                </div>
            )}
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
    );
};

export default ProjectBoardColumn;
