import React, { useState } from "react";
import Modal from "./Modal";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { createProspectAction } from "../../redux/actions/homesActions";

const AddProspectModal = ({ isOpen, title, size, closeModal = () => {} }) => {
    const { isCreatingProspect } = useSelector((state) => state.homesState);
    const { user } = useSelector((state) => state.userAuthState);

    const [picture, setPicture] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [location, setLocation] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        closeModal();
        setPicture("");
        setName("");
        setPrice("");
        setLocation("");
        setBedrooms("");
        setBathrooms("");
        setError("");
        setSuccess("");
    };

    const handleSubmit = async () => {
        setError("");

        const formData = new FormData();
        for (let image of picture) {
            formData.append("image", image);
        }
        formData.append(
            "investorId",
            user.type && user.type === "subuser" ? user.investorId : user?._id
        );
        formData.append("name", name);
        formData.append("location", location);
        formData.append("bedrooms", bedrooms);
        formData.append("bathrooms", bathrooms);
        formData.append("price", price);
        formData.append("scraped", false);
        formData.append("category", "prospect");

        const res = await dispatch(createProspectAction(formData));
        if (!res.success) {
            setError(res.message);
        } else {
            setSuccess(res.message);

            handleCloseModal();
        }
    };

    return (
        <Modal
            title={title}
            size={size}
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
            {error && (
                <div className="text-center max-w-4xl mx-auto bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}
            {success && (
                <div className="text-center max-w-4xl mx-auto bg-green-200 rounded-lg text-green-500 my-4 text-sm p-1">
                    {success}
                </div>
            )}
            <div className="flex flex-col space-y-2">
                <label className="text-white text-xl">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                />
            </div>
            <div className="flex flex-col space-y-2 my-4">
                <label className="text-white text-xl">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                />
            </div>
            <div className="flex space-x-5 items-center">
                <div className="flex-1 flex flex-col space-y-2 my-2">
                    <label className="text-white text-xl">Bedrooms</label>
                    <input
                        type="text"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="
            w-full
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                    />
                </div>
                <div className="flex-1 flex flex-col space-y-2 my-2">
                    <label className="text-white text-xl">Bathrooms</label>
                    <input
                        type="text"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="
            w-full
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                    />
                </div>
            </div>
            <div className="flex flex-col space-y-2 my-4">
                <label className="text-white text-xl">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-blue-color text-dark-blue-color
        "
                />
            </div>
            <div>
                <label htmlFor="picture">
                    <div
                        className="
          bg-white w-4/5 p-3 rounded-md flex
          flex-col items-center mx-auto cursor-pointer
          overflow-hidden 
          "
                    >
                        {picture[0] ? (
                            <div className="text-dark-blue-color overflow-hidden font-bold">
                                {picture.length > 1 ? (
                                    `${picture.length} images selected`
                                ) : (
                                    <span>
                                        {picture[0].name.length > 20 && "..."}
                                        {picture[0].name.substring(
                                            picture[0].name.length - 20,
                                            picture[0].name.length
                                        )}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <>
                                <HiOutlinePlusCircle className="text-5xl text-brown-color" />
                                <div className="text-dark-blue-color font-bold">
                                    Add Picture
                                </div>
                            </>
                        )}
                    </div>
                </label>
                <input
                    className="hidden"
                    id="picture"
                    onChange={(e) => setPicture(e.target.files)}
                    multiple
                    type="file"
                    accept="image/*"
                />
            </div>
            <div className="flex my-6 justify-center">
                <button
                    disabled={isCreatingProspect}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed 
                    bg-dark-blue-color flex justify-center items-center p-2 px-10 
                    text-white rounded-md uppercase text-md"
                >
                    {isCreatingProspect ? (
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

export default AddProspectModal;
