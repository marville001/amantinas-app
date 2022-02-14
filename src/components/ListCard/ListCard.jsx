import React from "react";
import { HiDotsVertical, HiOutlineLocationMarker } from "react-icons/hi";
import { BiBath, BiBed } from "react-icons/bi";
import priceFormatter from "../../utils/priceFormatter";

const ListCard = ({home}) => {
  return (
    <div className="shadow-md p-2 flex items-center justify-between rounded-lg">
      <div className="flex flex-col md:flex-row md:space-x-16 items-center justify-between">
        <img
          className="w-10 h-10 sm:w-15 sm:h-15 md:w-24 md:h-24 rounded-lg "
          src={`${process.env.REACT_APP_STATIC_URL + home?.images[0]}`}
          alt=""
        />
        <div className="mt-3 mb-2">
          <h2 className="text-dark-color text-sm font-bold">{home?.name}</h2>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row md:space-x-16  justify-between">
        <div className="flex items-center space-x-2 my-2">
          <HiOutlineLocationMarker className="text-md text-primary-blue cursor-pointer" />
          <p className="text-primary-blue text-sm font-light">{home?.location}</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 my-2">
            <BiBed className="text-md text-primary-blue cursor-pointer" />
            <p className="text-dark-color text-sm font-light">{home?.bedrooms}</p>
          </div>
          <div className="flex items-center space-x-2 my-2">
            <BiBath className="text-md text-primary-blue cursor-pointer" />
            <p className="text-dark-color text-sm font-light">{home?.bathrooms}</p>
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-dark-color font-medium font-sm">{priceFormatter(home?.price)}</p>
      </div>
      <div className="mt-3 mb-2 flex justify-between">
        <HiDotsVertical className="text-2xl text-primary-blue cursor-pointer" />
      </div>
    </div>
  );
};

export default ListCard;
