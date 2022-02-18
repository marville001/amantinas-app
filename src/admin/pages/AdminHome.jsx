import React, { useState } from "react";
import { FaAirbnb } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddAdminModal from "../components/AddAdminModal";
import DashboardWrapper from "../Wrapper";

const AdminHome = () => {
    const [addAdminModalOpen, setAddAdminModalOpen] = useState(false);
    return (
        <DashboardWrapper title="Archived Data">
            <div className="mb-10 mt-4 flex md:space-x-2 space-y-2 sm:space-x-2 sm:space-y-0 flex-col sm:flex-row">
                <div className="flex-[1] bg-white p-4">
                    <h4>Welcome "{"Admin Name"}"</h4>
                    <div className="flex items-center mt-6 justify-between">
                        <p className="text-dark-color">Total no of investors</p>
                        <div className="text-2xl text-dark-color font-bold">
                            450
                        </div>
                    </div>
                    <Link
                        to="/admin"
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
                <table className="w-full sm:w-1/2 mt-4">
                    <thead className="mb-2">
                        <tr>
                            <th className="text-left">Email</th>
                            <th className="text-left">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>malcolmockyer@gmail.com</td>
                            <td>Malcool Mockyer</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <AddAdminModal
                isOpen={addAdminModalOpen}
                closeModal={() => setAddAdminModalOpen(false)}
            />
        </DashboardWrapper>
    );
};

export default AdminHome;
