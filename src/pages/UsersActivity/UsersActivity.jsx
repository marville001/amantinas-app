import React from "react";
import { FaArrowLeft,  FaSpinner } from "react-icons/fa";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
const UsersActivity = () => {
    const { users, loading } = useSelector((state) => state.usersState);
    // const [activities, setActivities] = useState([])


    return (
        <DashboardWrapper title="Users Activity">
            <div className="mt-4 mx-2">
                <Link to="/home" className="flex items-center space-x-1 text-brown-color text-sm">
                    <FaArrowLeft className="text-xs mr-2" /> <span>Return</span>
                </Link>
            </div>
            <div className="my-6 bg-white rounded-xl p-2 max-w-6xl">
                <div className="flex flex-col-reverse md:flex-row justify-between my-6 mt-10">
                    <div className="flex space-x-4 ml-auto">
                        
                    </div>
                </div>

                {/* Table Start*/}

                <div className="overflow-x-auto">
                    {/* Title */}
                    <div className="flex lg:border-2 lg:border-opacity-70  lg:border-brown-color py-3 bg-fixed bg-light-blue items-center">
                        <div className="px-1 lg:px-3 flex items-center">
                            <input
                                type="checkbox"
                                className="w-3 h-3 lg:w-3 lg:h-3 mt-1"
                            />
                        </div>
                        {[
                            "Firstname",
                            "Lastname",
                            "Role",
                            "Email",
                            "Notes",
                        ]?.map((col, idx) => (
                            <div key={idx} className="flex-1 px-2 lg:px-4">
                                <h3 className="text-sm lg:text-lg capitalize">
                                    {col}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* Data */}
                    <div className="flex flex-col">
                        {users.length > 0 &&
                            users.map((user, idx) => (
                                <div className="flex py-3 hover:bg-light-blue cursor-pointer">
                                    <div className="px-1 lg:px-3">
                                        <input
                                            type="checkbox"
                                            className="w-3 h-3 lg:w-3 lg:h-3 mt-1"
                                        />
                                    </div>
                                    <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light">
                                        {user.firstname}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                        {user.lastname}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                        {user.role}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                        {user.email}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                        {""}
                                    </div>
                                </div>
                            ))}
                    </div>

                    {loading && (
                        <div className="flex justify-center my-4">
                            <FaSpinner className="animate-spin mr-4 text-2xl" />
                        </div>
                    )}
                </div>
                {/* Table End*/}
            </div>
        </DashboardWrapper>
    );
};

export default UsersActivity;
