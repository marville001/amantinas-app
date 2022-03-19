import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createSuggestionAction } from "../../redux/actions/suggestionsActions";
import Modal from "../../components/Modals/Modal";

const SuggestionModal = ({ isOpen, closeModal = () => {} }) => {
    const { isCreatingSuggestion } = useSelector(
        (state) => state.suggestionsState
    );
    const { admin } = useSelector((state) => state.adminState);

    const [subject, setSubject] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setSubject("");
        setSuggestion("");
        closeModal();
    };

    const handleSubmit = async () => {
        setError("");
        const obj = {
            userId: admin._id,
            subject,
            suggestion,
            userType: "admin",
        };

        const res = await dispatch(createSuggestionAction(obj, "admin"));
        if (!res.success) {
            setError(res.message);
        } else {
            handleCloseModal();
        }
    };

    return (
        <Modal
            title="Your Suggestion"
            size="md"
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
            {error && (
                <div className="text-center bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}
            <div className="flex flex-col space-y-2">
                <label className="text-white text-xl">Subject</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                />
            </div>
            <div className="flex flex-col space-y-2 my-4">
                <label className="text-white text-xl">Your Suggestion</label>
                <textarea
                    rows={6}
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                ></textarea>
            </div>
            <div className="flex  space-y-2 my-4 justify-center">
                <button
                    disabled={isCreatingSuggestion}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16 tracking-wider py-2 bg-dark-blue-color text-white text-lg rounded-md mt-8 flex items-center"
                >
                    {isCreatingSuggestion ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            <span className="capitalize">Loading...</span>
                        </>
                    ) : (
                        <span>Submit</span>
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default SuggestionModal;
