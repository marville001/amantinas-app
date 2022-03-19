import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import priceFormatter from "../../utils/priceFormatter";
import Modal from "./Modal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const HouseDetailsModal = ({ isOpen, closeModal = () => { }, home }) => {
    return (
        <Modal center={false} size="7xl" isOpen={isOpen} closeModal={closeModal}>
            <div className="text-white text-xl mb-6 flex justify-between">
                <span>{home?.name}</span>
                <span>{priceFormatter(home?.price)}</span>
            </div>

            <div className="w-full h-56 max-h-56  overflow-hidden">
                <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="h-56"
                >
                    {home?.images?.map((image) => (
                        <SwiperSlide
                            key={image}
                        >
                            <img
                                src={image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white sm:divide-x-2 divide-red-200 ">
                <div className="flex items-center space-x-4 justify-between  px-4">
                    <span>Bedrooms</span>
                    <strong>{home.bedrooms }</strong>
                </div>
                <div className="flex items-center space-x-4  justify-between px-4">
                    <span>Bathrooms</span>
                    <strong>{home.bathrooms }</strong>
                </div>
                <div className="flex items-center space-x-4  justify-between  px-4">
                    <span>Location</span>
                    <strong>{home.location }</strong>
                </div>
            </div>

            <div className=" mt-6 flex justify-between">
                <button
                    onClick={closeModal}
                    className="capitalize px-4 tracking-wider py-2 bg-red-100  text-xs text-dark-color rounded-md"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default HouseDetailsModal;
