import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mantine/core";

import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import AddTransactionModal from "../../components/Modals/AddTransactionModal";
import { getHomesAction } from "../../redux/actions/homesActions";
import { getTransactionsAction } from "../../redux/actions/transactionsActions";
import { getInvoicesAction } from "../../redux/actions/invoiceActions";
import priceFormatter from "../../utils/priceFormatter";
import AddInvoiceModal from "../../components/Modals/AddInvoiceModal";

const Ledger = () => {
    const { user } = useSelector((state) => state.userAuthState);
    const { transactions, loading, total } = useSelector(
        (state) => state.transactionsState
    );
    const {
        invoices,
        loading: invLoading,
        total: invTotal,
    } = useSelector((state) => state.invoiceState);

    const [addTransModalOpen, setAddTransModalOpen] = useState(false);
    const [addInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false);

    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Invoices
    const [activeInvPage, setActiveInvPage] = useState(1);
    const [invPageSize, setInvPageSize] = useState(5);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getTransactionsAction({
                investorId:
                    user.type && user.type === "subuser"
                        ? user.investorId
                        : user?._id,
                activePage,
                pageSize,
            })
        );
    }, [dispatch, user?._id, user.type, user.investorId, activePage, pageSize]);

    useEffect(() => {
        dispatch(
            getInvoicesAction({
                investorId:
                    user.type && user.type === "subuser"
                        ? user.investorId
                        : user?._id,
                activePage: activeInvPage,
                pageSize: invPageSize,
            })
        );
    }, [
        dispatch,
        user?._id,
        user.type,
        user.investorId,
        activeInvPage,
        invPageSize,
    ]);

    useEffect(() => {
        dispatch(
            getHomesAction({
                investorId:
                    user.type && user.type === "subuser"
                        ? user.investorId
                        : user?._id,
            })
        );
    }, [dispatch, user?._id, user.type, user.investorId]);

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

                <div className="mb-5 flex items-center space-x-4">
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(e.target.value);
                            setActivePage(1);
                        }}
                        name="perPage"
                        className="w-24"
                        id=""
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <h4>Total Rows</h4>
                </div>
                {/* Table Start*/}

                <div className="overflow-x-auto">
                    {/* Title */}
                    <div className="flex lg:border-2 lg:border-opacity-70  lg:border-brown-color py-1 bg-fixed bg-light-blue items-center">
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

                    {loading ? (
                        <div className="flex justify-center my-4">
                            <FaSpinner className="animate-spin mr-4 text-2xl" />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {transactions &&
                                transactions.length > 0 &&
                                transactions.map((trans, idx) => (
                                    <div
                                        key={idx}
                                        className="flex py-2 hover:bg-light-blue cursor-pointer"
                                    >
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
                                            {new Date(
                                                trans.date
                                            ).toDateString()}
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
                    )}
                </div>
                {/* Table End*/}

                <div className="m-6 flex justify-end items-center space-x-2">
                    <h4>
                        Showing{" "}
                        {pageSize <= total
                            ? pageSize <= transactions.length
                                ? pageSize
                                : transactions.length
                            : total}{" "}
                        of {total}
                    </h4>
                    <Pagination
                        total={Math.ceil(total / pageSize)}
                        page={activePage}
                        onChange={setActivePage}
                    />
                </div>
            </div>

            {/* Invoices */}
            <div className="bg-white my-6 rounded-xl p-4 max-w-6xl overflow-hidden">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color capitalize">
                    invoices
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />
                <div className="flex flex-col-reverse md:flex-row justify-between my-6 mt-10">
                    <input
                        type="search"
                        className="border mt-4 md:mt-0 px-2 py-2 md:max-w-[400px] text-sm rounded-md placeholder:text-sm outline-none"
                        placeholder={`Search Invoices`}
                    />
                    <div className="flex space-x-4 ml-auto">
                        <div className="cursor-pointer border-brown-color border-2 p-1 rounded-md grid place-items-center">
                            <HiOutlineDownload className="w-8 h-6 text-brown-color" />
                        </div>
                        <button
                            onClick={() => setAddInvoiceModalOpen(true)}
                            className="bg-primary-blue p-2 px-10 w-full text-white rounded-md uppercase text-xs"
                        >
                            Add invoice
                        </button>
                    </div>
                </div>

                <div className="mb-5 flex items-center space-x-4">
                    <select
                        value={invPageSize}
                        onChange={(e) => {
                            setInvPageSize(e.target.value);
                            setActiveInvPage(1);
                        }}
                        name="perPage"
                        className="w-24"
                        id=""
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <h4>Total Rows</h4>
                </div>
                {/* Table Start*/}

                <div className="overflow-x-auto">
                    {/* Title */}
                    <div className="flex lg:border-2 lg:border-opacity-70  lg:border-brown-color py-1 bg-fixed bg-light-blue items-center">
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

                    {invLoading ? (
                        <div className="flex justify-center my-4">
                            <FaSpinner className="animate-spin mr-4 text-2xl" />
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {invoices.length > 0 &&
                                invoices.map((inv, idx) => (
                                    <div
                                        key={idx}
                                        className="flex py-2 hover:bg-light-blue cursor-pointer"
                                    >
                                        <div className="px-1 lg:px-3">
                                            <input
                                                type="checkbox"
                                                className="w-3 h-3 lg:w-3 lg:h-3 mt-1"
                                            />
                                        </div>
                                        <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light">
                                            {inv.title}
                                        </div>
                                        <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light">
                                            {new Date(inv.date).toDateString()}
                                        </div>
                                        <div className="flex-1 px-2 lg:px-4 first-line:text-sm font-light">
                                            {priceFormatter(inv.amount)}
                                        </div>
                                        <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                            {inv.type}
                                        </div>
                                        <div className="flex-1 capitalize px-2 lg:px-4 first-line:text-sm font-light">
                                            {inv.recurring ? "True" : "False"}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                {/* Table End*/}

                <div className="m-6 flex justify-end items-center space-x-2">
                    <h4>
                        Showing{" "}
                        {invPageSize <= invTotal
                            ? invPageSize <= invoices.length
                                ? invPageSize
                                : invoices.length
                            : invTotal}{" "}
                        of {invTotal}
                    </h4>
                    <Pagination
                        total={Math.ceil(invTotal / invPageSize)}
                        page={activeInvPage}
                        onChange={setActiveInvPage}
                    />
                </div>
            </div>
            <AddTransactionModal
                isOpen={addTransModalOpen}
                closeModal={() => setAddTransModalOpen(false)}
            />
            <AddInvoiceModal
                isOpen={addInvoiceModalOpen}
                closeModal={() => setAddInvoiceModalOpen(false)}
            />
        </DashboardWrapper>
    );
};

export default Ledger;
