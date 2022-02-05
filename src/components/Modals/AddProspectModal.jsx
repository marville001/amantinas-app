import React, { useState } from "react";
import Modal from "./Modal";

import { HiOutlinePlusCircle } from "react-icons/hi";

const AddProspectModal = ({ isOpen, title, size, closeModal = () => {} }) => {
  const [picture, setPicture] = useState("");

  return (
    <Modal title={title} size={size} isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col space-y-2">
        <label className="text-white text-xl">Name</label>
        <input
          type="text"
          className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
        />
      </div>
      <div className="flex flex-col space-y-2 my-4">
        <label className="text-white text-xl">Location</label>
        <input
          type="text"
          className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
        />
      </div>
      <div className="flex space-x-5 items-center">
        <div className="flex-1 flex flex-col space-y-2 my-2">
          <label className="text-white text-xl">Bedrooms</label>
          <input
            type="text"
            className="
            w-full
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
          />
        </div>
        <div className="flex-1 flex flex-col space-y-2 my-2">
          <label className="text-white text-xl">Bathrooms</label>
          <input
            type="text"
            className="
            w-full
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2 my-4">
        <label className="text-white text-xl">Price</label>
        <input
          type="number"
          className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
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
              <div className="text-dark-color overflow-hidden font-bold">
                {picture[0].name.length > 20 && "..."}
                {picture[0].name.substring(
                  picture[0].name.length - 20,
                  picture[0].name.length
                )}
              </div>
            ) : (
              <>
                <HiOutlinePlusCircle className="text-5xl text-brown-color" />
                <div className="text-dark-color font-bold">Add Picture</div>
              </>
            )}
          </div>
        </label>
        <input
          className="hidden"
          id="picture"
          onChange={(e) => setPicture(e.target.files)}
          type="file"
          accept="image/*"
        />
      </div>
      <div className="flex  space-y-2 my-4 justify-center">
        <button className="uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8">
          Create
        </button>
      </div>
    </Modal>
  );
};

export default AddProspectModal;
