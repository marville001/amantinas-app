import React from "react";
import Modal from "../../components/Modals/Modal";

const ConfirmModal = ({ isOpen, message, closeModal = () => {}, action }) => {
    return (
        <Modal center={false} size="sm" isOpen={isOpen} closeModal={closeModal}>
            <div className="text-white text-2xl text-center mb-6">
                {message}
            </div>
            <div className=" mt-6 flex justify-between">
                <button
                    onClick={closeModal}
                    className="uppercase px-4 tracking-wider py-2 bg-brown-color text-white text-sm rounded-md"
                >
                    Cancel
                </button>
                <button
                    onClick={action}
                    className="uppercase px-4 tracking-wider py-2 bg-dark-color text-white text-sm rounded-md"
                >
                    Continue
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
