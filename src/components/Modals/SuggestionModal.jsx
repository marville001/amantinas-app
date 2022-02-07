import React from "react";
import Modal from "./Modal";

const SuggestionModal = ({ isOpen, closeModal = () => {} }) => {
  return (
    <Modal
      title="Your Suggestion"
      size="md"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="flex flex-col space-y-2">
        <label className="text-white text-xl">Subject</label>
        <input
          type="text"
          className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
        />
      </div>
      <div className="flex flex-col space-y-2 my-4">
        <label className="text-white text-xl">Your Suggestion</label>
        <textarea
          rows={6}
          className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
        ></textarea>
      </div>
      <div className="flex  space-y-2 my-4 justify-center">
        <button className="uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8">
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default SuggestionModal;
