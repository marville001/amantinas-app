import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaSpinner } from "react-icons/fa";
import { HiPencil, HiPlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
    getBoardAction,
    updateColumnNameAction,
} from "../../redux/actions/boardsActions";
import BoardCard from "../BoardCard/BoardCard";
import AddBoardItemModal from "../Modals/AddBoardItemModal";

const ProjectBoardColumn = ({ boardId, board }) => {
    const { user } = useSelector((state) => state.userAuthState);
    const { isUpdatingColumnName } = useSelector((state) => state.boardsState);

    const [isEditingName, setIsEditingName] = useState(false);

    // To control the column we are adding item to
    const [activeCol, setActiveCol] = useState({});

    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [name, setName] = useState(board.name);

    const dispatch = useDispatch();

    const inputRef = useRef();

    const handleSaveName = async () => {
        await dispatch(updateColumnNameAction(board._id, { name }));
        await dispatch(getBoardAction(boardId, { investorId: user?._id }));
    };

    return (
        <div>
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
            <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />
            <div
                onClick={() => {
                    setAddItemModalOpen(true);
                    setActiveCol(board);
                }}
                className="flex items-center px-5 py-2 w-full cursor-pointer"
            >
                <HiPlusSm />
                <p className="px-2 rounded-md">Add Item</p>
            </div>
            <div className="flex flex-col space-y-5 my-3">
                {board.items.length > 0 &&
                    board.items.map((item, idx) => (
                        <Draggable
                            index={idx}
                            draggableId={item?._id.toString()}
                            key={item?._id}
                            className="w-[90%] mx-auto"
                        >
                            {(provided) => {
                                return (
                                    <div
                                        className="board-item"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <BoardCard item={item} />
                                    </div>
                                );
                            }}
                        </Draggable>
                    ))}
            </div>

            <AddBoardItemModal
                isOpen={addItemModalOpen}
                closeModal={() => {
                    setAddItemModalOpen(false);
                    setActiveCol({});
                }}
                column={activeCol}
            />
        </div>
    );
};

export default ProjectBoardColumn;
