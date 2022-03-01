import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { RichTextEditor } from "@mantine/rte";
import { useDispatch, useSelector } from "react-redux";
import { addColumnItemAction } from "../../redux/actions/boardsActions";
import { FaSpinner } from "react-icons/fa";
import parse from "html-react-parser";


const EditBoardItemModal = ({ isOpen, columnId, editItem, closeModal = () => {} }) => {
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
        formData.append("columnId", columnId);
        formData.append("title", title);
        formData.append("description", description);

        const res = await dispatch(addColumnItemAction(formData));
        if (!res.success) {
            setError(res.message);
        } else {
            handleCloseModal();
        }
    };

    useEffect(() => {
        if(editItem._id){
            setTitle(editItem.title)
            setDescription(parse(editItem.description))
        }

      console.log({editItem});
    }, [editItem])
    

    return (
        <Modal
            size="3xl"
            isOpen={isOpen}
            closeModal={()=>{}}
            classes={"!bg-light-blue !shadow-2xl !min-h-[60vh] !relative"}
        >

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
                    className="!rounded text-sm p-1  !ring-dark-color"
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
                    bg-dark-color flex justify-center items-center p-1 px-10 
                    text-white rounded-md uppercase text-md"
                >
                    {isAddingColumnItem ? (
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
