import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { RichTextEditor } from "@mantine/rte";
import { useDispatch, useSelector } from "react-redux";
import { getBoardAction } from "../../redux/actions/boardsActions";
import { FaSpinner } from "react-icons/fa";
import parse from "html-react-parser";
import { put } from "../../utils/http";

const EditBoardItemModal = ({
    isOpen,
    columnId,
    boardId,
    editItem,
    closeModal = () => {},
}) => {
    const { user } = useSelector((state) => state.userAuthState);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState("");

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
        setTitle("");
        setError("");
        setDescription("");
    };

    const handleUpdate = async () => {
        setError("");
        setIsLoading(true);
        if (title === "" || description === "") return;

        try {
            const obj = {
                itemId: editItem?._id,
                title,
                description,
            };

            await put(`boards/column/item/details/${columnId}`, obj, "user");
            handleCloseModal();
            await dispatch(
                getBoardAction(boardId, {
                    investorId:
                        user.type && user.type === "subuser"
                            ? user.investorId
                            : user?._id,
                })
            );

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleCloseModal();
        }
    };

    useEffect(() => {
        if (editItem._id) {
            setTitle(editItem?.title);
            setDescription(parse(editItem?.description).toString());
        }

    }, [editItem]);

    return (
        <Modal
            size="3xl"
            isOpen={isOpen}
            closeModal={() => {}}
            classes={"!bg-light-blue dark:!bg-gray-secondary-color !shadow-2xl !min-h-[60vh] !relative"}
        >
            {error && (
                <div className="text-center max-w-4xl mx-auto bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}

            <div>
                <label className="mb-2 dark:text-white" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    className="!rounded text-sm p-1  !ring-dark-blue-color dark:text-white dark:bg-dark-primary-color"
                />
            </div>

            <div className="mt-4 mb-6">
                <label className="mb-2 dark:text-white" htmlFor="title">
                    Description
                </label>
                <RichTextEditor
                    controls={[
                        ["bold", "italic", "underline"],
                        ["unorderedList", "orderedList"],
                        ["h1", "h2", "h3"],
                    ]}
                    value={description.toString()}
                    onChange={setDescription}
                     className="dark:bg-dark-primary-color dark:text-white"
                />
            </div>

            <div className="flex justify-between absolute bottom-2 inset-x-0 mx-6">
                <button
                    onClick={handleCloseModal}
                    className="bg-primary-blue px-6 rounded text-white py-1 text-xs uppercase dark:bg-gray-primary-color"
                >
                    Cancel
                </button>
                <button
                    disabled={isLoading}
                    onClick={handleUpdate}
                    className="disabled:opacity-50 disabled:cursor-not-allowed 
                    bg-dark-blue-color flex justify-center items-center p-1 px-10 
                    text-white rounded-md uppercase text-md dark:bg-dark-primary-color"
                >
                    {isLoading ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            <span className="capitalize">Loading...</span>
                        </>
                    ) : (
                        <span>Update</span>
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default EditBoardItemModal;
