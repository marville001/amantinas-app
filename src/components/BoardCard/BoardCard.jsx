import React, { useState } from "react";
import { HiDotsVertical, HiPencilAlt } from "react-icons/hi";

import parse from "html-react-parser";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { Menu } from "@headlessui/react";
import ConfirmModal from "../Modals/ConfirmModal";
import { delete_ } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import { getBoardAction } from "../../redux/actions/boardsActions";
import { useParams } from "react-router-dom";
import EditBoardItemModal from "../Modals/EditBoardItemModal";
import { MenuItem } from "@mantine/core";

const BoardCard = ({ item, columnid }) => {
    const { user } = useSelector((state) => state.userAuthState);

    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [editItemModalOpen, setEditItemModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { boardId } = useParams();

    const handleDelete = async () => {
        setIsDeleting(true);

        try {
            await delete_(`boards/column/${columnid}/${item._id}`, {}, "user");
            await dispatch(
                getBoardAction(boardId, {
                    investorId:
                        user.type && user.type === "subuser"
                            ? user.investorId
                            : user?._id,
                })
            );

            setIsDeleting(false);
        } catch (error) {
            setIsDeleting(false);
            setConfirmDeleteOpen(false);
        }
    };

    return (
        <div
            className="shadow-md p-2 rounded-lg pb-5"
        >
            {item?.image && (
                <img
                    className="w-full h-32 sm:h-40 rounded-lg"
                    src={`${process.env.REACT_APP_STATIC_URL + item?.image}`}
                    alt=""
                />
            )}
            <div className="mt-3 mb-2 flex justify-between">
                <h2 className="text-dark-color font-bold">{item?.title}</h2>
                <Menu as="div" className="relative">
                    <Menu.Button>
                        <HiDotsVertical className="text-2xl text-primary-blue cursor-pointer" />
                        {/* <HiDotsVertical /> */}
                    </Menu.Button>
                    <Menu.Items
                        className="absolute top-0 right-6 text-white
                         bg-primary-blue p-2 pr-4 shadow-md rounded-md z-50 ring-0 outline-none border-0"
                    >
                        <div
                            onClick={() => setConfirmDeleteOpen(true)}
                            className="flex items-center p-1 mt-2 hover:opacity-80 space-x-4 cursor-pointer"
                        >
                            {isDeleting ? (
                                <FaSpinner className="animate-spin m-auto" />
                            ) : (
                                <>
                                    <FaTrash /> <span>Delete</span>
                                </>
                            )}
                        </div>
                        <Menu.Item as="div"
                            onClick={() => {
                                setEditItemModalOpen(true)
                                setEditItem(item)
                            }
                            }
                            className="flex items-center p-1 mt-2 hover:opacity-80 space-x-4 cursor-pointer"
                        >
                            {isDeleting ? (
                                <FaSpinner className="animate-spin m-auto" />
                            ) : (
                                <>
                                    <HiPencilAlt /> <span>Edit</span>
                                </>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>
            <div
                className="
                prose prose-slate
                prose-ol:list-decimal prose-ol:my-0
                prose-ul:list-disc prose-ul:my-0
                prose-li:p-0 prose-li:m-0
                prose-p:m-0 text-sm mt-2
                "
            >
                {parse(parse(item?.description || "none"))}
            </div>
            <ConfirmModal
                isOpen={confirmDeleteOpen}
                action={handleDelete}
                message="Please confirm deleting the item"
                loading={isDeleting}
                closeModal={() => {
                    setConfirmDeleteOpen(false);
                }}
            />

            <EditBoardItemModal
                isOpen={editItemModalOpen}
                closeModal={() => {
                    setEditItemModalOpen(false);
                    setEditItem({});
                }}
                editItem={editItem}
                columnid={columnid}
            />
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
