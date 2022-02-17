import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

import DataTable from "../../components/DataTable/DataTable";
import AddTransactionModal from "../../components/Modals/AddTransactionModal";
import { getHomesAction } from "../../redux/actions/homesActions";
import { getTransactionsAction } from "../../redux/actions/transactionsActions";
import priceFormatter from "../../utils/priceFormatter";

const Ledger = () => {
    const { user } = useSelector((state) => state.userAuthState);
    const { transactions, loading } = useSelector(
        (state) => state.transactionsState
    );
    const [addTransModalOpen, setAddTransModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomesAction({ investorId: user?._id }));
        dispatch(getTransactionsAction({ investorId: user?._id }));
    }, [dispatch, user?._id]);

    return (
        <DashboardWrapper title={"Ledger"}>
            <div className="bg-white my-6 rounded-xl p-4 max-w-6xl overflow-hidden">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
                    activities
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />
                <div className="flex flex-col-reverse md:flex-row justify-between my-6 mt-10">
                    <input
                        type="search"
                        className="border mt-4 md:mt-0 px-2 py-2 md:max-w-[400px] text-sm rounded-md placeholder:text-sm outline-none"
                        placeholder={`Search Activities`}
                    />
                    <div className="flex space-x-4 ml-auto">
                        <div className="cursor-pointer border-brown-color border-2 p-1 rounded-md grid place-items-center">
                            <HiOutlineDownload className="w-8 h-6 text-brown-color" />
                        </div>
                        <button
                            onClick={() => setAddTransModalOpen(true)}
                            className="bg-primary-blue p-2 px-10 w-full text-white rounded-md uppercase text-xs"
                        >
                            Add transaction
                        </button>
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
                            "Title",
                            "Date",
                            "Amount",
                            "Category",
                            "Recurring",
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
                        {transactions.length > 0 &&
                            transactions.map((trans, idx) => (
                                <div className="flex py-3 hover:bg-light-blue cursor-pointer">
                                    <div className="px-1 lg:px-3">
                                        <input
                                            type="checkbox"
                                            className="w-3 h-3 lg:w-3 lg:h-3 mt-1"
                                        />
                                    </div>
                                    <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light">
                                        {trans.title}
                                    </div>
                                    <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light">
                                        {new Date(trans.date).toDateString()}
                                    </div>
                                    <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light">
                                        {priceFormatter(trans.amount)}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                        {trans.type}
                                    </div>
                                    <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                        {trans.recurring ? "True" : "False"}
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
            <div className="my-6">
                <DataTable
                    title="Invoices"
                    btnText="Add Invoice"
                    columnTitles={[
                        "Account",
                        "Date",
                        "Type",
                        "Amount",
                        "Category",
                        "Property",
                        "Notes",
                    ]}
                />
            </div>
            <AddTransactionModal
                isOpen={addTransModalOpen}
                closeModal={() => setAddTransModalOpen(false)}
            />
        </DashboardWrapper>
    );
};

export default Ledger;
