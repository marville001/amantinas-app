import React from "react";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { VIEW_TYPE } from "../../redux/types";

const ViewTypeHeader = () => {
  const { viewType } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  return (
    <div className="py-4 flex justify-end px-12 items-center space-x-2">
      <div
        className={`${
          viewType === "cards" && "bg-primary-blue text-white p-1 rounded-md"
        }`}
      >
        <HiViewGrid
          onClick={() => dispatch({ type: VIEW_TYPE.CARDS })}
          className={`${
            viewType === "list" && "cursor-pointer text-xl text-dark-color"
          }`}
        />
      </div>
      <div
        className={`${
          viewType === "list" && "bg-primary-blue text-white p-1 rounded-md"
        }`}
      >
        <HiViewList
          onClick={() => dispatch({ type: VIEW_TYPE.LIST })}
          className={`${
            viewType === "cards" && "cursor-pointer text-xl text-dark-color"
          }`}
        />
      </div>
    </div>
  );
};

export default ViewTypeHeader;
