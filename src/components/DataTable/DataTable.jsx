import React from "react";
import { HiOutlineDownload } from "react-icons/hi";

const DataTable = ({
  title,
  btnText,
  columnTitles,
  showDownload = true,
  searchable = true,
  btnAction = () => {},
}) => {
  return (
    <div className="bg-white rounded-xl p-4 max-w-6xl overflow-hidden">
      <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
        {title}
      </h2>
      <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />
      <div className="flex flex-col-reverse md:flex-row justify-between my-6 mt-10">
        {searchable && (
          <input
            type="search"
            className="border mt-4 md:mt-0 px-2 py-2 min-w-[300px] text-sm rounded-md placeholder:text-sm outline-none"
            placeholder={`Search ${title}`}
          />
        )}
        <div className="flex space-x-4 ml-auto">
          {showDownload && (
            <div className="cursor-pointer border-brown-color border-2 p-1 rounded-md grid place-items-center">
              <HiOutlineDownload className="w-8 h-6 text-brown-color" />
            </div>
          )}
          <button
            onClick={btnAction}
            className="bg-primary-blue p-2 px-10 w-full text-white rounded-md uppercase text-xs"
          >
            {btnText}
          </button>
        </div>
      </div>

      {/* Table Start*/}

      <div className="overflow-x-auto">
        {/* Title */}
        <div className="flex lg:border-2 lg:border-opacity-70  lg:border-brown-color py-3 bg-fixed bg-light-blue items-center">
          <div className="px-1 lg:px-3 flex items-center">
            <input type="checkbox" className="w-3 h-3 lg:w-3 lg:h-3 mt-1" />
          </div>
          {columnTitles?.map((col, idx) => (
            <div key={idx} className="flex-1 px-2 lg:px-4">
              <h3 className="text-sm lg:text-lg">{col}</h3>
            </div>
          ))}
        </div>

        {/* Data */}
        <div className="flex flex-col">
          {[1, 2, 3].map((idx) => (
            <div className="flex py-3 hover:bg-light-blue cursor-pointer">
              <div className="px-1 lg:px-3">
                <input type="checkbox" className="w-3 h-3 lg:w-3 lg:h-3 mt-1" />
              </div>
              {columnTitles?.map((col, idx) => (
                <div key={idx} className="flex-1 px-2 lg:px-4">
                  <p className="text-sm font-light">{col}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Table End*/}
    </div>
  );
};

export default DataTable;
