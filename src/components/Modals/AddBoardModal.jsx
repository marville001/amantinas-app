import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createBoardAction } from "../../redux/actions/boardsActions";
import Modal from "./Modal";
import {useNavigate} from 'react-router-dom'

const AddBoardModal = ({ isOpen, size, closeModal = () => {} }) => {
    const { user } = useSelector((state) => state.userAuthState);
    const { isCreatingBoard } = useSelector((state) => state.boardsState);

    const [name, setName] = useState("");
    const [columns, setColumns] = useState(2);
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseModal = () => {
        setName("");
        setColumns(2);
        closeModal();
    };

    const handleSubmit = async () => {
        setError("");
        const obj = {
            name,
            columns,
            investorId: user?._id,
        };

        const res = await dispatch(createBoardAction(obj));
        if (!res.success) {
            setError(res.message);
        } else {
            handleCloseModal();
            navigate("/project-boards")
        }
    };

    return (
        <Modal
            title={"New Board"}
            size={size}
            isOpen={isOpen}
            closeModal={closeModal}
        >
            {error && (
                <div className="text-center bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}
            <div className="flex flex-col space-y-2">
                <label className="text-white text-xl">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                />
            </div>
            <div className="flex flex-col space-y-2 my-4 items-start">
                <label className="text-white text-xl">Columns</label>
                <input
                    type="number"
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                />
            </div>
            <div className="flex  space-y-2 my-4 justify-center">
                <button
                    disabled={isCreatingBoard}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8 flex items-center"
                >
                    {isCreatingBoard ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            <span className="capitalize">Loading...</span>
                        </>
                    ) : (
                        <span>Create</span>
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default AddBoardModal;
