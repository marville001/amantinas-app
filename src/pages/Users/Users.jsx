import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import AddUserModal from "../../components/Modals/AddUserModal";
import ConfirmModal from "../../components/Modals/ConfirmModal";
import { loadUsersAction } from "../../redux/actions/usersActions";
import { delete_ } from "../../utils/http";

const Users = () => {
    const { users, loading } = useSelector((state) => state.usersState);
    const { user } = useSelector((state) => state.userAuthState);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [active, setActive] = useState("");

    const dispatch = useDispatch();

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await delete_(`sub-user/${active}`, {}, "user");

            dispatch(
                loadUsersAction({
                    investorId:
                        user.type && user.type === "subuser"
                            ? user.investorId
                            : user?._id,
                })
            );
            setIsDeleting(false);
            setActive("")
            setConfirmDeleteOpen(false);

        } catch (error) {
            setActive("")
            setConfirmDeleteOpen(false);
        }
    };

    useEffect(() => {
        dispatch(
            loadUsersAction({
                investorId:
                    user.type && user.type === "subuser"
                        ? user.investorId
                        : user?._id,
            })
        );
    }, [dispatch, user?._id, user.type, user.investorId]);

    return (
        <DashboardWrapper title="Users">
            <div className="my-6 bg-white rounded-xl p-2 max-w-6xl dark:bg-gray-primary-color">
                <div className="flex flex-col-reverse md:flex-row justify-between my-6 mt-10">
                    <div className="flex space-x-4 ml-auto">
                        <button
                            // disabled={user.plan === "free" && users.length >= 2}
                            onClick={() => setAddUserModalOpen(true)}
                            className="disabled:opacity-50 disabled:cursor-not-allowed bg-primary-blue p-2 px-10 w-full text-white rounded-md dark:bg-dark-primary-color uppercase text-xs"
                        >
                            Add User
                        </button>
                    </div>
                </div>

                {/* Table Start*/}

                <div className="overflow-x-auto">
                    {/* Title */}
                    <div className="flex lg:border-2 lg:border-opacity-70  lg:border-brown-color py-3 bg-fixed bg-light-blue items-center dark:bg-gray-secondary-color">
                        <div className="px-1 lg:px-3 flex items-center">
                            <input
                                type="checkbox"
                                className="w-3 h-3 lg:w-3 lg:h-3 mt-1"
                            />
                        </div>
                        {["Firstname", "Lastname", "Role", "Email", ""]?.map(
                            (col, idx) => (
                                <div key={idx} className="flex-1 px-2 lg:px-4">
                                    <h3 className="text-sm lg:text-lg capitalize dark:text-white">
                                        {col}
                                    </h3>
                                </div>
                            )
                        )}
                    </div>

                    {/* Data */}
                    <div className="flex flex-col">
                        {users.length > 0 &&
                            users.map((user, idx) => (
                                <div
                                    key={idx}
                                    className="flex py-3 hover:bg-light-blue cursor-pointer dark:hover:bg-gray-secondary-color"
                                >
                                    <div className="px-1 lg:px-3">
                                        <input
                                            type="checkbox"
                                            className="w-3 h-3 lg:w-3 lg:h-3 mt-1"
                                        />
                                    </div>
                                    <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                        {user.firstname}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                        {user.lastname}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                        {user.role}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                        {user.email}
                                    </div>
                                    <div className="flex-1 flex justify-end space-x-5 capitalize px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                        <HiPencilAlt className="text-xl text-dark-blue-color hover:text-primary-blue" />
                                        <HiTrash
                                            onClick={() => {
                                                setConfirmDeleteOpen(true);
                                                setActive(user._id);
                                            }}
                                            className="text-xl text-dark-blue-color hover:text-red-400"
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>

                    {loading && (
                        <div className="flex justify-center my-4">
                            <FaSpinner className="animate-spin mr-4 text-2xl dark:text-white" />
                        </div>
                    )}
                </div>
                {/* Table End*/}
            </div>
            <AddUserModal
                isOpen={addUserModalOpen}
                closeModal={() => setAddUserModalOpen(false)}
            />

            <ConfirmModal
                isOpen={confirmDeleteOpen}
                action={handleDelete}
                message="Please confirm deleting the user!"
                loading={isDeleting}
                closeModal={() => {
                    setConfirmDeleteOpen(false);
                    setActive("");
                }}
            />
        </DashboardWrapper>
    );
};

export default Users;
