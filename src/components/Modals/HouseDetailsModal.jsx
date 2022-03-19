import React from "react";
import priceFormatter from "../../utils/priceFormatter";
import Modal from "./Modal";

const HouseDetailsModal = ({
    isOpen,
    closeModal = () => { },
    home
}) => {
    return (
        <Modal center={false} size="7xl" isOpen={isOpen} closeModal={() => {}}>
            <div className="text-white text-xl mb-6 flex justify-between">
                <span>{home?.name}</span>
                <span>{priceFormatter(home?.price)}</span>
            </div>

            <div className="w-full h-56">
                <img src={home?.images[0]} alt=""
                className="w-full h-full object-cover"
                />
            </div>

            <div className=" mt-6 flex justify-between">
                <button
                    onClick={closeModal}
                    className="uppercase px-4 tracking-wider py-2 bg-brown-color text-white text-sm rounded-md"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default HouseDetailsModal;
