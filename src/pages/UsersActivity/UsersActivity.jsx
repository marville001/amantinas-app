import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import { get } from "../../utils/http";
const UsersActivity = () => {
    const { user } = useSelector((state) => state.userAuthState);
    const {  loading } = useSelector((state) => state.usersState);

    const [loadingTime, setLoadingTime] = useState(false);
    const [timelog, setTimelog] = useState(false);

    useEffect(() => {
        const loadTime = async () => {
            setLoadingTime(true);
            const { timelog } = await get(`time-log/all/${user?._id}`);
            setLoadingTime(false);
            setTimelog(timelog);
        };

        if (user?._id) {
            loadTime();
        }
    }, [user?._id]);

    return (
        <DashboardWrapper title="Users Activity">
            <div className="mt-4 mx-2">
                <Link
                    to="/home"
                    className="flex items-center space-x-1 text-brown-color text-sm"
                >
                    <FaArrowLeft className="text-xs mr-2" /> <span>Return</span>
                </Link>
            </div>
            <div className="my-6 bg-white rounded-xl p-2 max-w-6xl">
                <div className="flex flex-col-reverse md:flex-row justify-between my-6 mt-10">
                    <div className="flex space-x-4 ml-auto"></div>
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
                        {["#", "Time In", "Time Out", "Work Done"]?.map(
                            (col, idx) => (
                                <div
                                    key={idx}
                                    className={`${
                                        idx > 0 && "flex-1"
                                    } px-2 lg:px-4`}
                                >
                                    <h3 className="text-sm lg:text-lg capitalize">
                                        {col}
                                    </h3>
                                </div>
                            )
                        )}
                    </div>

                    {loadingTime ? (
                        <div className="flex justify-center my-4">
                            <FaSpinner className="animate-spin text-2xl" />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {timelog.length > 0 &&
                                timelog.map((log, idx) => (
                                    <div
                                        key={idx}
                                        className="flex py-3 hover:bg-light-blue cursor-pointer"
                                    >
                                        <div className="px-1 lg:px-3">
                                            <input
                                                type="checkbox"
                                                className="w-3 h-3 lg:w-3 lg:h-3 mt-1"
                                            />
                                        </div>
                                        <div className="px-2 lg:px-4 first-line:text-sm font-light">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                            {new Date(
                                                log.timeIn
                                            ).toLocaleString() || "NB"}
                                        </div>
                                        <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                            {log.timeOut? new Date(log.timeOut).toLocaleString(): "NB"}
                                        </div>
                                        <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                            {log.work || "NB"}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}

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
