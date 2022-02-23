import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Modal from "./Modal";
import { put } from "../../utils/http";

const TimeOutModal = ({
    isOpen,
    size,
    setLoadingTime,
    setTimelog,
    loadingTime,
    timelog,
    closeModal = () => {},
}) => {
    const [work, setWork] = useState("");
    const [error, setError] = useState("");

    const handleCloseModal = () => {
        setWork("");
        closeModal();
    };

    const handleSubmit = async () => {
        setError("");
        setLoadingTime(true);
        try {
            const data = await put(`time-log/out/${timelog._id}`, {
                timeOut: new Date(),
                work,
            });
            setTimelog(data.timelog);
            setLoadingTime(false);
            handleCloseModal();
        } catch (error) {
            setError(error.response.data.message);
            setLoadingTime(false);
        }
    };

    return (
        <Modal size={size} isOpen={isOpen} closeModal={handleCloseModal}>
            {error && (
                <div className="text-center bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}
            <div className="flex flex-col space-y-2">
                <label className="text-white text-2xl text-center mb-8 block">
                    What did you work on today
                </label>
                <textarea
                    type="text"
                    rows={10}
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                ></textarea>
            </div>
            <div className="flex  space-y-2 my-4 justify-center">
                <button
                    disabled={loadingTime}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8 flex items-center"
                >
                    {loadingTime ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            <span className="capitalize">Loading...</span>
                        </>
                    ) : (
                        <span>confirm time out</span>
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default TimeOutModal;
