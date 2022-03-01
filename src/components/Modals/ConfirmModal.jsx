import React from "react";
import { FaSpinner } from "react-icons/fa";
import Modal from "../../components/Modals/Modal";

const ConfirmModal = ({
    isOpen,
    message,
    closeModal = () => {},
    action,
    loading,
}) => {
    return (
        <Modal center={false} size="md" isOpen={isOpen} closeModal={() => {}}>
            <div className="text-white text-xl mb-6">{message}</div>
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
                    {loading ? (
                        <FaSpinner className="animate-spin m-auto" />
                    ) : (
                        <span>Continue</span>
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
