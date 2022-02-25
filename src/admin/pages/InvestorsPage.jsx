import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInvestorsAction } from "../../redux/actions/adminActions";
import { delete_ } from "../../utils/http";
import ConfirmModal from "../components/ConfirmModal";
import DashboardWrapper from "../Wrapper";

const InvestorsPage = () => {
    const { investors, isLoadingInvestors } = useSelector(
        (state) => state.adminState
    );

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [active, setActive] = useState("");
    const [success, setSuccess] = useState("");

    const dispatch = useDispatch();

    const deleteInvestor = async () => {
        try {
            setConfirmDeleteOpen(false);
            await delete_(`users/investors/${active}`);
            setSuccess("Investor Deleted Successfully");

            setTimeout(() => {
                setSuccess("");
            }, 2000);

            await dispatch(getInvestorsAction());
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(getInvestorsAction());
    }, [dispatch]);

    return (
        <DashboardWrapper title={`Investors`}>
            {isLoadingInvestors && (
                <div className="my-4 p-4 bg-white">
                    <FaSpinner className="animate-spin" />
                </div>
            )}
            {success && (
                <div className="my-4 p-2 rounded-md bg-green-200 text-center text-green-800 text-lg">
                    {success}
                </div>
            )}

            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow-md sm:rounded-lg">
                            <table class="min-w-full">
                                <thead class="bg-white">
                                    <tr>
                                        <th
                                            scope="col"
                                            class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                            #
                                        </th>
                                        <th
                                            scope="col"
                                            class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                            Plan
                                        </th>
                                        <th
                                            scope="col"
                                            class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                            Created At
                                        </th>
                                        <th
                                            scope="col"
                                            class="relative py-3 px-6"
                                        >
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investors?.map((investor, i) => (
                                        <tr class="bg-white border-b">
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                                                {i + 1}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                                                {investor?.name}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                                                {investor?.email}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                                                {investor?.plan}
                                            </td>
                                            <td class="py-4 px-6 text-sm font-medium whitespace-nowrap">
                                                {investor?.createdAt}
                                            </td>

                                            <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap flex items-center space-x-5">
                                                <Link
                                                    to={`/admin/investors/${investor._id}`}
                                                    class="text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <HiTrash
                                                    onClick={() => {
                                                        setActive(investor._id);
                                                        setConfirmDeleteOpen(
                                                            true
                                                        );
                                                    }}
                                                    className="text-xl text-brown-color hover:text-red-400 cursor-pointer"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={confirmDeleteOpen}
                action={deleteInvestor}
                message="Deleting investor will delete all their records. Confirm delete?"
                closeModal={() => {
                    setConfirmDeleteOpen(false);
                    setActive("");
                }}
            />
        </DashboardWrapper>
    );
};

export default InvestorsPage;
