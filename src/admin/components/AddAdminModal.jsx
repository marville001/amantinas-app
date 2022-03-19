import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modals/Modal";
import { createAdminAction } from "../../redux/actions/adminActions";

const AddAdminModal = ({ isOpen, closeModal = () => {} }) => {
    const { isCreatingAdmin } = useSelector(
        (state) => state.adminState
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setEmail("");
        setName("");
        setPassword("");
        closeModal();
    };

    const handleSubmit = async () => {
        setError("");
        const obj = {
            name,
            email,
            password,
        };

        const res = await dispatch(createAdminAction(obj, "admin"));
        if (!res.success) {
            setError(res.message);
        } else {
            handleCloseModal();
        }
    };

    return (
        <Modal size="sm" isOpen={isOpen} closeModal={handleCloseModal}>
            <div className="text-white text-2xl text-center mb-6">
                Add Admin
            </div>
            {error && (
                <div className="text-center bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}
            <div className="flex flex-col space-y-2">
                <label className="text-white">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
        outline-none p-2 py-1 text-sm !rounded bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                />
            </div>
            <div className="flex flex-col space-y-2 my-4">
                <label className="text-white">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
        outline-none p-2 py-1 text-sm !rounded bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                />
            </div>
            <div className="flex flex-col space-y-2">
                <label className="text-white">Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
        outline-none p-2 py-1 text-sm !rounded bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                />
            </div>
            <div className="flex  space-y-2 justify-center">
                <button
                    disabled={isCreatingAdmin}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16 tracking-wider py-2 bg-dark-blue-color text-white text-lg rounded-md mt-8 flex items-center"
                >
                    {isCreatingAdmin ? (
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

export default AddAdminModal;
