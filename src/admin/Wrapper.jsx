import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { getLoggedInAdmin } from "../redux/actions/adminActions";

const DashboardWrapper = ({ children, title }) => {
    const { sidebarOpen } = useSelector((state) => state.appState);
    const adminState = useSelector((state) => state.adminState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.adminToken && !adminState.admin?._id)
            dispatch(getLoggedInAdmin());
    }, [dispatch, adminState.admin?._id]);

    useEffect(() => {
        if (!localStorage.adminToken) {
            navigate("/admin/login");
        }
    }, [navigate]);
    

    if (adminState?.loading) {
        return <LoadingContainer />;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div
                className={`${
                    sidebarOpen ? "lg:pl-[320px]" : ""
                } flex-1 px-6 py-8 overflow-hidden duration-300 transition-all ease-linear`}
            >
                <Topbar title={title} />
                {children}
            </div>
        </div>
    );
};

const LoadingContainer = () => (
    <div className="flex justify-center p-16">
        <div className="flex flex-col items-center">
            <FaSpinner className="animate-spin text-3xl font-light" />
            <span className="my-10">Loading... please wait....</span>
        </div>
    </div>
);

export default DashboardWrapper;
