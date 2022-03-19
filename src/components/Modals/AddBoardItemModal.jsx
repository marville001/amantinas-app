import React, { useState } from "react";
import Modal from "./Modal";
import { RichTextEditor } from "@mantine/rte";
import { useDispatch, useSelector } from "react-redux";
import { addColumnItemAction } from "../../redux/actions/boardsActions";
import { FaSpinner } from "react-icons/fa";


const AddBoardItemModal = ({ isOpen, column, closeModal = () => {} }) => {
    const { isAddingColumnItem } = useSelector((state) => state.boardsState);

    const [title, setTitle] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
        setTitle("");
        setError("");
        setPicture("");
        setDescription("");
    };

    const handleSubmit = async () => {
        setError("");

        const formData = new FormData();
        if (picture[0]) formData.append("image", picture[0]);
        formData.append("columnId", column._id);
        formData.append("title", title);
        formData.append("description", description);

        const res = await dispatch(addColumnItemAction(formData));
        if (!res.success) {
            setError(res.message);
        } else {
            handleCloseModal();
        }
    };

    return (
        <Modal
            size="3xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
            classes={"!bg-light-blue !shadow-2xl !min-h-[60vh] !relative"}
        >
            <h2 className="text-lg mb-3">{column.name}</h2>

            {error && (
                <div className="text-center max-w-4xl mx-auto bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}

            <div>
                <label className="mb-2" htmlFor="title">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    className="!rounded text-sm p-1  !ring-dark-blue-color"
                />
            </div>

            <div className="mt-4">
                <label className="mb-2" htmlFor="picture">
                    Image
                </label>
                <label htmlFor="picture">
                    <div
                        className="
          bg-white w-full p-6 rounded-md flex
          flex-col items-center mx-auto cursor-pointer
          overflow-hidden 
          "
                    >
                        {picture[0] ? (
                            <div className="text-dark-blue-color overflow-hidden font-bold">
                                {picture[0].name.length > 20 && "..."}
                                {picture[0].name.substring(
                                    picture[0].name.length - 20,
                                    picture[0].name.length
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="text-dark-blue-color font-bold">
                                    Click here to select image
                                </div>
                            </>
                        )}
                    </div>
                </label>
                <input
                    className="hidden"
                    id="picture"
                    onChange={(e) => setPicture(e.target.files)}
                    type="file"
                    accept="image/*"
                />
            </div>

            <div className="mt-4 mb-6">
                <label className="mb-2" htmlFor="title">
                    Description
                </label>
                <RichTextEditor
                    controls={[
                        ["bold", "italic", "underline"],
                        ["unorderedList", "orderedList"],
                        ["h1", "h2", "h3"],
                    ]}
                    value={description}
                    onChange={setDescription}
                />
            </div>

            <div className="flex justify-between absolute bottom-2 inset-x-0 mx-6">
                <button
                    onClick={handleCloseModal}
                    className="bg-primary-blue px-6 rounded text-white py-1 text-xs uppercase"
                >
                    Cancel
                </button>
                <button
                    disabled={isAddingColumnItem}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed 
                    bg-dark-blue-color flex justify-center items-center p-1 px-10 
                    text-white rounded-md uppercase text-md"
                >
                    {isAddingColumnItem ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            <span className="capitalize">Loading...</span>
                        </>
                    ) : (
                        <span>Save</span>
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default AddBoardItemModal;
