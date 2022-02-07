import React from "react";
import { HiDotsVertical, HiOutlineLocationMarker } from "react-icons/hi";
import { BiBath, BiBed } from "react-icons/bi";

const ListCard = () => {
  return (
    <div className="shadow-md p-2 flex items-center justify-between rounded-lg">
      <div className="flex flex-col md:flex-row md:space-x-16 items-center justify-between">
        <img
          className="w-10 h-10 sm:w-15 sm:h-15 md:w-24 md:h-24 rounded-lg "
          src="https://media.istockphoto.com/photos/home-with-blue-siding-and-stone-faade-on-base-of-home-picture-id1272128530?b=1&k=20&m=1272128530&s=170667a&w=0&h=k9lT5-DEmkmehDb-EKRHoP1-op2DTgz4ibiWGXmj7h8="
          alt=""
        />
        <div className="mt-3 mb-2">
          <h2 className="text-dark-color text-sm font-bold">Real Estate</h2>
        </div>
      </div>

      <div className="flex items-center flex-col md:flex-row md:space-x-16  justify-between">
        <div className="flex items-center space-x-2 my-2">
          <HiOutlineLocationMarker className="text-md text-primary-blue cursor-pointer" />
          <p className="text-primary-blue text-sm font-light">Florida</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 my-2">
            <BiBed className="text-md text-primary-blue cursor-pointer" />
            <p className="text-dark-color text-sm font-light">5</p>
          </div>
          <div className="flex items-center space-x-2 my-2">
            <BiBath className="text-md text-primary-blue cursor-pointer" />
            <p className="text-dark-color text-sm font-light">5</p>
          </div>
        </div>
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
