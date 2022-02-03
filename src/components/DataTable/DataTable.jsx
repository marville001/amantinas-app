import React from "react";
import { HiOutlineDownload } from "react-icons/hi";

const DataTable = ({ title, btnText, columnTitles }) => {
  return (
    <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
      <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
        {title}
      </h2>
      <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />
      <div className="flex justify-between my-6 mt-10">
        <input
          type="search"
          className="border px-2 py-2 min-w-[300px] text-sm rounded-md placeholder:text-sm outline-none"
          placeholder={`Search ${title}`}
        />
        <div className="flex space-x-4">
          <div className="cursor-pointer border-brown-color border-2 p-1 rounded-md grid place-items-center">
            <HiOutlineDownload className="w-8 h-6 text-brown-color" />
          </div>
          <button className="bg-primary-blue p-2 px-10 w-full text-white rounded-md uppercase text-xs">
            {btnText}
          </button>
        </div>
      </div>

      {/* Table Start*/}
      {/* Title */}
      <div className="flex border-2 border-opacity-70 overflow-x-auto border-brown-color py-3 bg-light-blue items-center">
        <div className="px-3 flex items-center">
          <input type="checkbox" className="w-4 h-4 mt-1" />
        </div>
        {columnTitles?.map((col, idx) => (
          <div key={idx} className="flex-1 px-4">
            <h3>{col}</h3>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        {[1, 2, 3].map((idx) => (
          <div className="flex py-3">
            <div className="px-3">
              <input type="checkbox" className="w-4 h-4 mt-1" />
            </div>
            {columnTitles?.map((col, idx) => (
              <div key={idx} className="flex-1 px-4">
                <p className="text-sm font-light">{col}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Data */}

      {/* Table End*/}
    </div>
  );
};

export default DataTable;
