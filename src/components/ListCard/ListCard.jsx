import React from "react";
import { FaBabyCarriage, FaCar } from "react-icons/fa";
import { HiDotsVertical, HiOutlineLocationMarker } from "react-icons/hi";

const ListCard = () => {
  return (
    <div className="shadow-md p-2 flex items-center justify-between rounded-lg">
      <img
        className="w-24 h-24 rounded-lg "
        src="https://media.istockphoto.com/photos/home-with-blue-siding-and-stone-faade-on-base-of-home-picture-id1272128530?b=1&k=20&m=1272128530&s=170667a&w=0&h=k9lT5-DEmkmehDb-EKRHoP1-op2DTgz4ibiWGXmj7h8="
        alt=""
      />
      <div className="mt-3 mb-2 flex justify-between">
        <h2 className="text-dark-color font-bold">Real Estate</h2>
      </div>

      <div className="flex items-center space-x-2 my-2">
        <HiOutlineLocationMarker className="text-md text-primary-blue cursor-pointer" />
        <p className="text-primary-blue text-sm font-light">Florida</p>
      </div>
      <div className="flex items-center space-x-2 my-2">
        <FaCar className="text-md text-primary-blue cursor-pointer" />
        <p className="text-dark-color text-sm font-light">5</p>
      </div>
      <div className="flex items-center space-x-2 my-2">
        <FaBabyCarriage className="text-md text-primary-blue cursor-pointer" />
        <p className="text-dark-color text-sm font-light">5</p>
      </div>
      <div className="">
        <p className="text-dark-color font-medium font-sm">$1,700,000</p>
      </div>
      <div className="mt-3 mb-2 flex justify-between">
        <HiDotsVertical className="text-2xl text-primary-blue cursor-pointer" />
      </div>
    </div>
  );
};

export default ListCard;