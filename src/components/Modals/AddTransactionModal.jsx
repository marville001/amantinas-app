import React, { useState } from "react";
import Modal from "./Modal";
// import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";

const AddTransactionModal = ({ isOpen, size, closeModal = () => {} }) => {
    // const {  } = useSelector((state) => state.);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("false");
    const [error, setError] = useState("");

    // const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
    };

    const handleSubmit = async () => {
        setError("");

        // const res = await dispatch();
        // if (!res.success) {
        //     setError(res.message);
        // } else {
        //     handleCloseModal();
        // }
    };

    return (
        <Modal size="md" isOpen={isOpen} closeModal={handleCloseModal}>
            <div className="text-center text-white text-2xl mb-4">
                New Transaction
            </div>
            {error && (
                <div className="text-center bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}
            <div className="flex flex-1 flex-col space-y-2">
                <label className="text-white text-md">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="
        outline-none p-1 px-2 text-sm !rounded bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 my-2">
                <label className="text-white text-md">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                />
            </div>

            <div className="flex flex-1 flex-col space-y-2 my-2">
                <label className="text-white text-md">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                />
            </div>

            <div className="flex flex-1 flex-col space-y-2 my-2">
                <label className="text-white text-md">
                    Date of transaction
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                />
            </div>

            <div className="flex flex-1 flex-col space-y-2 my-2">
                <label className="text-white text-md">
                    Type of transaction
                </label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="
        outline-none p-1 text-sm rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                >
                    <option value="">Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>

            <div className="flex flex-1 flex-col space-y-2 my-2 py-2">
                <label className="text-white text-md">
                    <input
                        type="checkbox"
                        value={recurring}
                        onChange={(e) => setRecurring(e.target.checked)}
                        className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color mr-2
        "
                    />
                    Recurring Transaction?
                </label>
            </div>
            {recurring && (
                <div className="flex space-x-2">
                    <div className="flex flex-1 flex-col space-y-2 my-2">
                        <label className="text-white text-md">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                        />
                    </div>

                    <div className="flex flex-1 flex-col space-y-2 my-2">
                        <label className="text-white text-md">
                            End Date{" "}
                            <span className="text-xs"> (optional)</span>
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                        />
                    </div>
                </div>
            )}

            <div className="flex  space-y-2 my-4 justify-center">
                <button
                    disabled={false}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8 flex items-center"
                >
                    {false ? (
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

export default AddTransactionModal;
