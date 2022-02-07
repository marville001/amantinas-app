import React, { useState } from "react";
import Modal from "./Modal";

const AddUserModal = ({ isOpen, title, size, closeModal = () => {} }) => {
  const [sundayFree, setSundayFree] = useState(true)
  return (
    <Modal title="New User" size="xl" isOpen={isOpen} closeModal={closeModal}>
      <div className="flex items-center space-x-3 -my-6 ">
        <div className="flex flex-1 flex-col space-y-2">
          <label className="text-white text-xl">First Name</label>
          <input
            type="text"
            className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 my-4">
          <label className="text-white text-xl">Last Name</label>
          <input
            type="text"
            className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex flex-1 flex-col space-y-2 my-4">
          <label className="text-white text-xl">Email</label>
          <input
            type="email"
            className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
          />
        </div>
        <div className="flex flex-1 flex-col space-y-2 my-4">
          <label className="text-white text-xl">Role</label>
          <select
            type="text"
            className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
          >
            <option value="investor">Investor</option>
          </select>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-2 my-4">
        <label className="text-white text-xl">Schedule</label>

        <div className="flex flex-col items-center space-y-3 border p-3 rounded-sm">
          <div className="flex flex-col space-y-1 w-full">
            <p className=" text-white font-light">Monday - Friday</p>
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <input
                  type="time"
                  className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                />
                <p className="text-white text-xs mt-1">From</p>
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="time"
                  className="border w-full border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                />
                <p className="text-white text-xs mt-1">To</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <p className=" text-white font-light">Saturday</p>
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <input
                  type="time"
                  className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                />
                <p className="text-white text-xs mt-1">From</p>
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="time"
                  className="border w-full border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                />
                <p className="text-white text-xs mt-1">To</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <p className=" text-white font-light">Sunday</p>
            <div className="flex justify-start my-2 items-center">
              <input checked={sundayFree} onChange={e=>setSundayFree(e.target.checked)} type="checkbox" className="w-4 h-4" />{" "}
              <span className="text-white ml-2">Free</span>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <input
                  type="time"
                  disabled={sundayFree}
                  className="border w-full disabled:bg-slate-300 border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                />
                <p className="text-white text-xs mt-1">From</p>
              </div>
              <div className="flex flex-col w-full">
                <input
                  type="time"
                  disabled={sundayFree}
                  className="border w-full disabled:bg-slate-300 border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                />
                <p className="text-white text-xs mt-1">To</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="flex  space-y-2 my-4 justify-center">
        <button className="uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8">
          Create
        </button>
      </div>
    </Modal>
  );
};

export default AddUserModal;
