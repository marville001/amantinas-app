import React from "react";
import { HiDotsVertical, HiOutlineLocationMarker } from "react-icons/hi";
import { BiBath, BiBed } from "react-icons/bi";
import priceFormatter from "../../utils/priceFormatter";

const HomeCard = ({ home }) => {
    console.log({ home });
    return (
        <div className="shadow-lg p-2 rounded-lg pb-5">
            <img
                className="w-full h-52 object-cover rounded-lg"
                src={`${process.env.REACT_APP_STATIC_URL + home?.images[0]}`}
                alt=""
            />
            <div className="mt-3 mb-2 flex justify-between">
                <h2 className="text-dark-color font-bold">{home?.name}</h2>
                <HiDotsVertical className="text-2xl text-primary-blue cursor-pointer" />
            </div>

            <div className="flex items-center space-x-2 my-2">
                <HiOutlineLocationMarker className="text-md text-primary-blue cursor-pointer" />
                <p className="text-primary-blue text-sm font-light">
                    {home?.location}
                </p>
            </div>

            <div className="flex justify-between pr-5">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 my-2">
                        <BiBed className="text-md text-primary-blue cursor-pointer" />
                        <p className="text-dark-color text-sm font-light">
                            {home?.bedrooms}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 my-2">
                        <BiBath className="text-md text-primary-blue cursor-pointer " />
                        <p className="text-dark-color text-sm font-light">
                            {home?.bathrooms}
                        </p>
                    </div>
                </div>
                <p className="text-dark-color font-medium font-sm">
                    {priceFormatter(home?.price)}
                </p>
            </div>
        </div>
    );
};

export default HomeCard;
