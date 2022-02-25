import React, { useState } from "react";
import { useEffect } from "react";
import { FaAirbnb, FaSpinner } from "react-icons/fa";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminsAction } from "../../redux/actions/adminActions";
import { delete_ } from "../../utils/http";
import AddAdminModal from "../components/AddAdminModal";
import ConfirmModal from "../components/ConfirmModal";
import DashboardWrapper from "../Wrapper";

const AdminHome = () => {
    const { admins, admin, isLoadingAdmins } = useSelector(
        (state) => state.adminState
    );
    const { investors } = useSelector((state) => state.adminState);

    const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [active, setActive] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminsAction());
    }, [dispatch]);

    const deleteAdmin = async () => {
        try {
            setConfirmDeleteOpen(false);
            await delete_(`users/admins/${active}`);
            setSuccess("Admin Deleted Successfully");
            setTimeout(() => {
                setSuccess("");
            }, 2000);
            await dispatch(getAdminsAction());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardWrapper title="Archived Data">
            <div className="mb-10 mt-4 flex md:space-x-2 space-y-2 sm:space-x-2 sm:space-y-0 flex-col sm:flex-row">
                <div className="flex-[1] bg-white p-4">
                    <h4>
                        Welcome <span className="font-bold">{admin?.name}</span>
                    </h4>
                    <div className="flex items-center mt-6 justify-between">
                        <p className="text-dark-color">Total no of investors</p>
                        <div className="text-2xl text-dark-color font-bold">
                            {investors?.length}
                        </div>
                    </div>
                    <Link
                        to="/admin/investors"
                        className="mt-3 rounded uppercase tracking-wider text-xs inline-block 
                        bg-primary-blue text-white py-2 px-6"
                    >
                        Manage Investors
                    </Link>
                </div>
                <div className="flex-[2] bg-white p-4">
                    <h4 className="text-dark-color font-bold">Analytics</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-8">
                        <div className="flex items-center">
                            <div className="rounded-full bg-light-blue p-2">
                                <FaAirbnb className="text-2xl font-bold" />
                            </div>
                            <div className="ml-2 flex flex-col space-y-0">
                                <h3 className="font-bold text-2xl text-primary-blue">
                                    24
                                </h3>
                                <p className="text-sm">Fee Plan Users</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="rounded-full bg-light-blue p-2">
                                <FaAirbnb className="text-2xl font-bold" />
                            </div>
                            <div className="ml-2 flex flex-col space-y-0">
                                <h3 className="font-bold text-2xl text-primary-blue">
                                    24
                                </h3>
                                <p className="text-sm">Elite Plan Users</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="rounded-full bg-light-blue p-2">
                                <FaAirbnb className="text-2xl font-bold" />
                            </div>
                            <div className="ml-2 flex flex-col space-y-0">
                                <h3 className="font-bold text-2xl text-primary-blue">
                                    24
                                </h3>
                                <p className="text-sm">Pro Plan Users</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="rounded-full bg-light-blue p-2">
                                <FaAirbnb className="text-2xl font-bold" />
                            </div>
                            <div className="ml-2 flex flex-col space-y-0">
                                <h3 className="font-bold text-2xl text-primary-blue">
                                    5
                                </h3>
                                <p className="text-sm">Admin Users</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-4">
                <div className="flex items-center justify-between w-full sm:w-1/2 mt-4">
                    <h2>Admins</h2>
                    <button
                        onClick={() => setAddAdminModalOpen(true)}
                        className="bg-dark-color py-1 px-6 text-sm text-white rounded-md"
                    >
                        Add Admin
                    </button>
                </div>
                {success && (
                <div className="my-4 p-2 rounded-md w-full sm:w-1/2 bg-green-200 text-center text-green-800 text-lg">
                    {success}
                </div>
            )}

                <table className="w-full sm:w-1/2 mt-4">
                    <thead className="mb-2">
                        <tr>
                            <th className="text-left">Name</th>
                            <th className="text-left">Email</th>
                            <th className="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins
                            ?.filter((ad) => ad._id !== admin._id)
                            .map((ad) => (
                                <tr key={ad._id}>
                                    <td>{ad.name}</td>
                                    <td>{ad.email}</td>
                                    <td>
                                        <div className="flex space-x-4">
                                            <HiPencilAlt className="text-xl text-dark-color hover:text-primary-blue cursor-pointer" />
                                            <HiTrash
                                                onClick={() => {
                                                    setActive(ad._id);
                                                    setConfirmDeleteOpen(true);
                                                }}
                                                className="text-xl text-dark-color hover:text-primary-blue cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {isLoadingAdmins && (
                    <div className="py-3">
                        <FaSpinner className="animate-spin" />
                    </div>
                )}
            </div>
            <AddAdminModal
                isOpen={addAdminModalOpen}
                closeModal={() => setAddAdminModalOpen(false)}
            />
            <ConfirmModal
                isOpen={confirmDeleteOpen}
                action={deleteAdmin}
                message="Please confirm deleting admin"
                closeModal={() => {
                    setConfirmDeleteOpen(false);
                    setActive("");
                }}
            />
        </DashboardWrapper>
    );
};

export default AdminHome;
