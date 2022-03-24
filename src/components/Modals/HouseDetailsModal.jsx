import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import priceFormatter from "../../utils/priceFormatter";
import Modal from "./Modal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const HouseDetailsModal = ({ isOpen, closeModal = () => {}, home }) => {
    const [interestRate, setInterestRate] = useState(4);
    const [termInYears, setTermInYears] = useState(30);
    const [downPaymentAmount, setDownPaymentAmount] = useState(30);
    const downPaymentPercent = 0.2;
    const loanAmount = 240000;

    const calculateClosingCost = () => {
        return 400;
    };

    const claculateMorgage = () => {
        const mortPrice =
            ((home.price - downPaymentAmount) * interestRate) / 360;
        return mortPrice;
    };

    useEffect(() => {
        setDownPaymentAmount(home.price * downPaymentPercent);
    }, [home.price, downPaymentPercent]);

    return (
        <Modal
            center={false}
            size="7xl"
            isOpen={isOpen}
            closeModal={closeModal}
        >
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
                        <SwiperSlide key={image}>
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
                <div className="flex items-center space-x-4 justify-between  pr-4">
                    <span>Bedrooms</span>
                    <strong>{home.bedrooms}</strong>
                </div>
                <div className="flex items-center space-x-4  justify-between px-4">
                    <span>Bathrooms</span>
                    <strong>{home.bathrooms}</strong>
                </div>
                <div className="flex items-center space-x-4  justify-between  pl-4">
                    <span>Location</span>
                    <strong>{home.location}</strong>
                </div>
            </div>

            {/* Calculators */}
            <hr className="my-4 text-brown-color opacity-60" />

            <div className="flex gap-4">
                <div className="flex-[1]">
                    <h4 className="text-white my-1">Home Price ($)</h4>
                    <input type="number" className="disabled:bg-brown-color disabled:text-white outline-none ring-0 border-0 py-1" disabled value={home.price} />

                    <h4 className="text-white my-1">Down Payment ($)</h4>
                    <input
                        type="number"
                        className="py-1"
                        value={downPaymentAmount}
                    />

                    <label className="text-white mt-4 block my-1">
                        Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        className="!w-auto inline py-1"
                        step={0.001}
                        onChange={(e) => setInterestRate(e.target.value)}
                        value={interestRate}
                    />
                </div>
                <div className="flex-[1]">
                    <div className="ring-2 ring-[#eee] rounded p-2">
                        <h2 className="text-brown-color">
                            Mortgage Calculator{" "}
                        </h2>

                        <div className="mt-2 text-2xl text-white">
                            {priceFormatter(claculateMorgage())}
                        </div>
                    </div>

                    <div className="ring-2 ring-[#eee] rounded p-2 mt-2">
                        <h2 className="text-brown-color">
                            Projected Rent Calculator{" "}
                        </h2>

                        <div className="mt-2 text-2xl text-white">
                            {priceFormatter(home.price * 0.014)}
                        </div>
                    </div>
                </div>
            </div>

            <div className=" mt-6 flex justify-between">
                <button
                    onClick={closeModal}
                    className="capitalize px-4 tracking-wider py-2 bg-red-100  text-xs text-dark-blue-color rounded-md"
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default HouseDetailsModal;
