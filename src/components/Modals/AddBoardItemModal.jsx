import React from "react";
import Modal from "./Modal";

const AddBoardItemModal = ({ isOpen, closeModal = () => {} }) => {

    const handleCloseModal = () => {
        closeModal();
    };

    return (
        <Modal
            size="3xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
            classes={"!bg-light-blue !shadow-2xl"}
        >
            <h4>Add Item</h4>
        </Modal>
    );
};

export default AddBoardItemModal;
