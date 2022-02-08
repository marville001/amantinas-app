import React from "react";

import { HiChevronUp } from "react-icons/hi";

const SuggestionBoardCard = () => {
  return (
    <div className="shadow-md p-2 rounded pb-5 flex my-2">
      <div className="flex flex-col items-center justify-start p-2">
        <HiChevronUp className="text-3xl text-brown-color cursor-pointer p-0" />
        <span className="-mt-2">45</span>
      </div>
      <div>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consec tetur adipisicing elit. Molestiae
          qui repellat quasi?
        </p>
        <div className="cursor-pointer text-brown-color mt-4">Feedback</div>
      </div>
    </div>
  );
};

export default SuggestionBoardCard;
