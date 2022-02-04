import React from 'react';
import Modal from './Modal';

const AddBoardModal = ({isOpen,title,size, closeModal=() => {}}) => {
  return (
    <Modal
    title={title}
    size={size}
    isOpen={isOpen}
    closeModal={closeModal}
  >
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
    <div className="flex flex-col space-y-2 my-4 items-start">
      <label className="text-white text-xl">Columns</label>
      <input
        type="number"
        className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
      />
    </div>
    <div className="flex  space-y-2 my-4 justify-center">
      <button className="uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8">Create</button>
    </div>
  </Modal>
  );
};

export default AddBoardModal;
