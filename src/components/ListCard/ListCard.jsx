import React, { useState } from "react";
import { HiDotsVertical, HiOutlineLocationMarker } from "react-icons/hi";
import { BiBath, BiBed } from "react-icons/bi";
import priceFormatter from "../../utils/priceFormatter";
import { Menu } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
    getHomesAction,
    updateProspectAction,
} from "../../redux/actions/homesActions";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { delete_ } from "../../utils/http";
import ConfirmModal from "../Modals/ConfirmModal";

const ListCard = ({ home }) => {
    const { user } = useSelector((state) => state.userAuthState);

    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        setIsDeleting(true);

        try {
            await delete_(`homes/${home._id}`, {}, "user");
            await dispatch(
                getHomesAction({
                    investorId:
                        user.type && user.type === "subuser"
                            ? user.investorId
                            : user?._id,
                })
            );
            setIsDeleting(false);
        } catch (error) {
            setIsDeleting(false);
        }
    };

    const handleUpdate = async (obj) => {
        setLoading(true);
        const res = await dispatch(updateProspectAction(home._id, obj));

        if (res.success) {
            await dispatch(
                getHomesAction({
                    investorId:
                        user.type && user.type === "subuser"
                            ? user.investorId
                            : user?._id,
                })
            );
            setLoading(false);
        } else {
            setLoading(false);
        }
    };
    return (
        <div className="shadow-md relative p-2 flex items-center justify-between rounded-lg">
            <div className="flex flex-col md:flex-row md:space-x-16 items-center justify-between">
                <img
                    className="w-10 h-10 sm:w-15 sm:h-15 md:w-24 md:h-24 rounded-lg "
                    src={home?.images[0]}
                    alt=""
                />
                <div className="mt-3 mb-2">
                    <h2 className="text-dark-color text-sm font-bold">
                        {home?.name}
                    </h2>
                </div>
            </div>

            {loading && (
                <FaSpinner className="absolute animate-spin mr-4 text-2xl right-6 text-primary-blue" />
            )}

            <div className="flex items-center flex-col md:flex-row md:space-x-16  justify-between">
                <div className="flex items-center space-x-2 my-2">
                    <HiOutlineLocationMarker className="text-md text-primary-blue cursor-pointer" />
                    <p className="text-primary-blue text-sm font-light">
                        {home?.location}
                    </p>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2 my-2">
                        <BiBed className="text-md text-primary-blue cursor-pointer" />
                        <p className="text-dark-color text-sm font-light">
                            {home?.bedrooms}
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 my-2">
                        <BiBath className="text-md text-primary-blue cursor-pointer" />
                        <p className="text-dark-color text-sm font-light">
                            {home?.bathrooms}
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-dark-color font-medium font-sm">
                    {priceFormatter(home?.price)}
                </p>
            </div>
            <div className="mt-3 mb-2 flex justify-between">
                {!home.isArchived && (
                    <Menu as="div" className="relative">
                        <Menu.Button>
                            <HiDotsVertical className="text-2xl text-primary-blue cursor-pointer" />
                            {/* <HiDotsVertical /> */}
                        </Menu.Button>
                        <Menu.Items
                            className="absolute top-0 right-6 min-w-[140px] text-white
                         bg-primary-blue p-2 shadow-md rounded-md z-50 ring-0 outline-none border-0"
                        >
                            <h5 className="text-xs font-medium uppercase">
                                Add To
                            </h5>
                            <hr className="mt-2" />
                            <div className="pl-2 flex flex-col divide-y-[1px]">
                                <Menu.Item
                                    onClick={() =>
                                        !home.isActive &&
                                        handleUpdate({ isActive: true })
                                    }
                                    className={`${
                                        home.isActive
                                            ? "cursor-not-allowed opacity-70"
                                            : "cursor-pointer"
                                    } text-xs py-2`}
                                    as="div"
                                >
                                    Active Offers
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() =>
                                        !home.isManaged &&
                                        handleUpdate({ isManaged: true })
                                    }
                                    className={`${
                                        home.isManaged
                                            ? "cursor-not-allowed opacity-70"
                                            : "cursor-pointer"
                                    } text-xs py-2`}
                                    as="div"
                                >
                                    Managed Properties
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() =>
                                        !home.isArchived &&
                                        handleUpdate({
                                            isArchived: true,
                                            isActive: false,
                                            isManaged: false,
                                        })
                                    }
                                    className={`${
                                        home.isArchived
                                            ? "cursor-not-allowed opacity-70"
                                            : "cursor-pointer"
                                    } text-xs py-2`}
                                    as="div"
                                >
                                    Archived Data
                                </Menu.Item>
                            </div>
                            <div className="bg-gray-200 h-1 w-full"></div>
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
                        </Menu.Items>
                    </Menu>
                )}
            </div>
            <ConfirmModal
                isOpen={confirmDeleteOpen}
                action={handleDelete}
                message="Please confirm deleting prospect"
                loading={isDeleting}
                closeModal={() => {
                    setConfirmDeleteOpen(false);
                }}
            />
        </div>
    );
};

export default ListCard;
