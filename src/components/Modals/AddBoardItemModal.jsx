import React, { useState } from "react";
import Modal from "./Modal";
import { RichTextEditor } from "@mantine/rte";

const initialValue =
    "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";

const AddBoardItemModal = ({ isOpen, closeModal = () => {} }) => {
    const [title, setTitle] = useState("");
    const [picture, setPicture] = useState("");
    const [description, setDescription] = useState(initialValue);

    const handleCloseModal = () => {
        closeModal();
    };

    return (
        <Modal
            size="3xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
            classes={"!bg-light-blue !shadow-2xl !min-h-[60vh] !relative"}
        >
            <h2 className="text-lg mb-3">New</h2>
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
                            <div className="text-dark-color overflow-hidden font-bold">
                                {picture[0].name.length > 20 && "..."}
                                {picture[0].name.substring(
                                    picture[0].name.length - 20,
                                    picture[0].name.length
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="text-dark-color font-bold">
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
                    className="bg-dark-color px-6 rounded text-white py-1 text-xs uppercase"
                >
                    Cancel
                </button>
                <button className="bg-primary-blue px-6 rounded text-white py-1 text-xs uppercase">
                    Save
                </button>
            </div>
        </Modal>
    );
};

export default AddBoardItemModal;
