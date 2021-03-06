import React, { useCallback, useEffect, useState } from "react";
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
    // const [termInYears, setTermInYears] = useState(30);
    const [downPaymentAmount, setDownPaymentAmount] = useState(30);
    const [askingPrice, setAskingPrice] = useState(0);
    const [afterRepairValue, setAfterRepairValue] = useState(0);
    const [rehabCost, setRehabCost] = useState(0);
    const [brrr, setBrrr] = useState(0);
    const [insurance, setInsurance] = useState(0);
    const downPaymentPercent = 0.02;
    // const loanAmount = 240000;

    const [monthlyIncome, setMonthlyIncome] = useState(0);

    const calculateClosingCost = useCallback((aPrice) => {
        const const1 = parseInt(aPrice);
        const closingcost = const1 * 0.03;
        return closingcost;
    }, []);

    const calculateMorgage = () => {
        const mortPrice =
            ((home.price - downPaymentAmount) * interestRate) / 360;
        return mortPrice;
    };

    useEffect(() => {
        setDownPaymentAmount((home.price * downPaymentPercent).toFixed(2));
    }, [home.price, downPaymentPercent]);

    // Monthly Profit:
    // Rent - Property Management - Mortgage (if using it) = Monthly Profit

    // if not using mortgage

    // Rent - Property Management - Insurance(monthly so divide by 12) - Taxes (monthly so divide by 12) = Monthly Profit

    const calculateRent = () => home.price * 0.014;

    useEffect(() => {
        const rent = home.price * 0.014;
        const project_mngmnt = rent * 0.01;
        const _mortPrice =
            ((home.price - downPaymentAmount) * interestRate) / 360;
        setMonthlyIncome((rent - project_mngmnt - _mortPrice).toFixed(2));
    }, [home.price, downPaymentAmount, interestRate]);

    useEffect(() => {
        //  BRRR Method Calculator
        // (After Repair Value * 0.7) - (Offer price / Asking price - Rehab Cost - Closing costs)
        const value1 = afterRepairValue * 0.7;
        const value2 = parseInt(home.price) / parseInt(askingPrice);
        const _closingCost = calculateClosingCost(askingPrice);

        const _brrr = value1 - (value2 - rehabCost - _closingCost);

        setBrrr(_brrr > 0 ? _brrr : 0);
    }, [
        home.price,
        afterRepairValue,
        downPaymentAmount,
        rehabCost,
        askingPrice,
        calculateClosingCost,
    ]);

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
                <div className="flex space-y-2 sm:pr-4 flex-col">
                    <span>Bedrooms</span>
                    <strong>{home.bedrooms}</strong>
                </div>
                <div className="flex space-y-2 sm:px-4 flex-col">
                    <span>Bathrooms</span>
                    <strong>{home.bathrooms}</strong>
                </div>
                <div className="flex space-y-2  sm:pl-4 flex-col">
                    <span>Location</span>
                    <strong>{home.location}</strong>
                </div>
            </div>

            {/* Calculators */}
            <hr className="my-4 text-brown-color opacity-60" />

            <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-[1]">
                    <h4 className="text-white my-1">Asking Price ($)</h4>
                    <input
                        type="number"
                        className="disabled:bg-brown-color disabled:text-white outline-none ring-0 border-0 py-1"
                        onChange={(e) => setAskingPrice(e.target.value)}
                        value={askingPrice}
                        min={0}
                    />

                    <h4 className="text-white my-1">Down Payment ($)</h4>
                    <input
                        type="number"
                        className="py-1"
                        value={downPaymentAmount}
                        min={0}
                    />

                    <label className="text-white mt-4 block my-1">
                        Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        className="py-1"
                        step={0.001}
                        onChange={(e) => setInterestRate(e.target.value)}
                        value={interestRate}
                        min={0}
                    />

                    <hr className="my-2" />

                    <h4 className="text-white my-1">After Repair Value ($)</h4>
                    <input
                        type="number"
                        className="disabled:bg-brown-color disabled:text-white outline-none ring-0 border-0 py-1"
                        onChange={(e) => setAfterRepairValue(e.target.value)}
                        value={afterRepairValue}
                        min={0}
                    />

                    <h4 className="text-white my-1">Rehab Cost ($)</h4>
                    <input
                        type="number"
                        className="disabled:bg-brown-color disabled:text-white outline-none ring-0 border-0 py-1"
                        onChange={(e) => setRehabCost(e.target.value)}
                        value={rehabCost}
                        min={0}
                    />

                    <h4 className="text-white my-1 hidden">Insurance ($)</h4>
                    <input
                        type="number"
                        className="hidden disabled:bg-brown-color disabled:text-white outline-none ring-0 border-0 py-1"
                        onChange={(e) => setInsurance(e.target.value)}
                        value={insurance}
                        min={0}
                    />
                </div>
                <div className="flex-[1]">
                    <div className="ring-2 ring-[#eee] rounded p-2">
                        <h2 className="text-brown-color">
                            Mortgage Calculator{" "}
                        </h2>

                        <div className="mt-2 text-2xl text-white">
                            {priceFormatter(calculateMorgage())}
                        </div>
                    </div>

                    <div className="ring-2 ring-[#eee] rounded p-2 mt-2">
                        <h2 className="text-brown-color">
                            Projected Rent Calculator
                        </h2>

                        <div className="mt-2 text-2xl text-white">
                            {priceFormatter(calculateRent())}
                        </div>
                    </div>

                    <div className="ring-2 ring-[#eee] rounded p-2 mt-2">
                        <h2 className="text-brown-color">
                            BRRR Method Calculator
                        </h2>

                        <div className="mt-2 text-2xl text-white">
                            {priceFormatter(brrr)}
                        </div>
                    </div>

                    <div className="ring-2 ring-[#eee] rounded p-2 mt-2">
                        <h2 className="text-brown-color">Monthly Income</h2>

                        <div className="mt-2 text-2xl text-white">
                            {priceFormatter(monthlyIncome)}
                        </div>
                    </div>

                    <div className="ring-2 ring-[#eee] rounded p-2 mt-2">
                        <h2 className="text-brown-color">Yearly Income</h2>

                        <div className="mt-2 text-2xl text-white">
                            {priceFormatter(monthlyIncome * 12)}
                        </div>
                    </div>

                    <div className="ring-2 ring-[#eee] rounded p-2 mt-2">
                        <h2 className="text-brown-color">
                            {" "}
                            Yearly ROI Calculator
                        </h2>

                        <div className="mt-2 text-2xl text-white">55 %</div>
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
