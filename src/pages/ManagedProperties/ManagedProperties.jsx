import React, { useEffect } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";
import CashFlowChart from "../../components/CashFlowChart/CashFlowChart";
// import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import ListCard from "../../components/ListCard/ListCard";
import ViewTypeHeader from "../../components/ViewTypeHeader/ViewTypeHeader";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { getHomesAction } from "../../redux/actions/homesActions";

const ManagedProperties = () => {
    const { viewType } = useSelector((state) => state.appState);
    const { homes, loading } = useSelector((state) => state.homesState);
    const { user } = useSelector((state) => state.userAuthState);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomesAction({ investorId: user.type && user.type === "subuser"? user.investorId : user?._id }));
    }, [dispatch, user?._id, user.type, user.investorId]);
    return (
        <DashboardWrapper title="Managed Properties">
            <div className="my-8 p-10 max-w-2xl bg-white rounded-xl mx-auto dark:bg-gray-primary-color">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-blue-color dark:text-white">
                    Overview
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-blue-color bg-dark-blue-color dark:border-white dark:bg-white" />

                <div className="my-6 flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-3">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <p className="text-dark-blue-color font-medium dark:text-white">From</p>
                        {/* <CustomDatePicker /> */}
                        <input type="date" name="" id="" className="dark:text-white dark:bg-dark-primary-color" />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <p className="text-dark-blue-color font-medium dark:text-white">To</p>
                        {/* <CustomDatePicker /> */}
                        <input type="date" name="" id="" className="dark:text-white dark:bg-dark-primary-color" />
                    </div>
                </div>
                <div className="h-64 w-full pb-10">
                    <CashFlowChart />
                    <hr />
                </div>
            </div>
            <div className="my-6 bg-white rounded-xl p-4 max-w-6xl dark:bg-gray-primary-color">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-blue-color dark:text-white">
                    Managed Properties
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-blue-color bg-dark-blue-color dark:border-white dark:bg-white" />

                <ViewTypeHeader />
                {loading && (
                    <div className="flex justify-center my-4">
                        <FaSpinner className="animate-spin mr-4 text-2xl" />
                    </div>
                )}

                {viewType === "cards" ? (
                    <div className="px-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
                        {homes
                            ?.filter((h) => h.isManaged === true && h.isArchived === false)
                            .map((home, idx) => (
                                <HomeCard key={home._id} home={home} />
                            ))}
                    </div>
                ) : (
                    <div className="md:px-12 flex flex-col space-y-2">
                        {homes
                            ?.filter((h) => h.isManaged === true && h.isArchived === false)
                            .map((home, idx) => (
                                <ListCard key={home._id} home={home} />
                            ))}
                    </div>
                )}
            </div>
        </DashboardWrapper>
    );
};

export default ManagedProperties;
