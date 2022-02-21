import React from "react";
import { HiDotsVertical } from "react-icons/hi";

import parse from "html-react-parser";

const BoardCard = ({ item }) => {
    return (
        <div className="shadow-md p-2 rounded-lg pb-5">
            {item?.image && (
                <img
                    className="w-full h-32 sm:h-40 rounded-lg"
                    src={`${process.env.REACT_APP_STATIC_URL + item?.image}`}
                    alt=""
                />
            )}
            <div className="mt-3 mb-2 flex justify-between">
                <h2 className="text-dark-color font-bold">{item.title}</h2>
                <HiDotsVertical className="text-2xl text-primary-blue cursor-pointer" />
            </div>
            <div
                className="
                prose prose-slate
                prose-ol:list-decimal prose-ol:my-0
                prose-ul:list-disc prose-ul:my-0
                prose-li:p-0 prose-li:m-0
                prose-p:m-0
                "
            >
                {parse(parse(item.description))}
            </div>
        </div>
    );
};

// const BoardHomeCard = ()=>(
//   <div className="shadow-md p-2 rounded-lg pb-5">
//             {item?.image && (
//                 <img
//                     className="w-full h-32 sm:h-40 rounded-lg"
//                     src={`${process.env.REACT_APP_STATIC_URL + item?.image}`}
//                     alt=""
//                 />
//             )}
//             <div className="mt-3 mb-2 flex justify-between">
//                 <h2 className="text-dark-color font-bold">{item.title}</h2>
//                 <HiDotsVertical className="text-2xl text-primary-blue cursor-pointer" />
//             </div>

//             <div className="flex items-center space-x-2 my-2">
//                 <HiOutlineLocationMarker className="text-md text-primary-blue cursor-pointer" />
//                 <p className="text-primary-blue text-sm font-light">Florida</p>
//             </div>

//             <div className="flex justify-between pr-5">
//                 <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-2 my-2">
//                         <FaCar className="text-md text-primary-blue cursor-pointer" />
//                         <p className="text-dark-color text-sm font-light">5</p>
//                     </div>
//                     <div className="flex items-center space-x-2 my-2">
//                         <FaBabyCarriage className="text-md text-primary-blue cursor-pointer" />
//                         <p className="text-dark-color text-sm font-light">5</p>
//                     </div>
//                 </div>
//                 <p className="text-dark-color font-medium font-sm">
//                     $1,700,000
//                 </p>
//             </div>
//         </div>
// )

export default BoardCard;
