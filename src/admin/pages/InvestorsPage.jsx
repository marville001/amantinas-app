import React, { useEffect } from "react";
import { HiOutlineEye, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getInvestorsAction } from "../../redux/actions/adminActions";
import DashboardWrapper from "../Wrapper";

const InvestorsPage = () => {
    const { investors } = useSelector((state) => state.adminState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInvestorsAction());
    }, [dispatch]);

    return (
        <DashboardWrapper title={`Investors`}>
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
                                                    to="/admin/investors"
                                                    class="text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <HiTrash className="text-xl text-brown-color hover:text-red-400 cursor-pointer" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardWrapper>
    );
};

export default InvestorsPage;
