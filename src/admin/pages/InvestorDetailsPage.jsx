import React, { useEffect } from "react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { getInvestorsAction } from "../../redux/actions/adminActions";
import DashboardWrapper from "../Wrapper";

const InvestorDetailsPage = () => {
    const { investors, isLoadingInvestors } = useSelector(
        (state) => state.adminState
    );

    const [investor, setInvestor] = useState({});

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getInvestorsAction());
    }, [dispatch]);

    useEffect(() => {
        if (investors.length > 0) {
            const invs = investors.find((inv) => inv._id === id);
            setInvestor(invs);
        }
    }, [investors, id]);

    return (
        <DashboardWrapper title={`Investors Details`}>
            {isLoadingInvestors && (
                <div className="my-4 p-4 bg-white">
                    <FaSpinner className="animate-spin" />
                </div>
            )}
        </DashboardWrapper>
    );
};

export default InvestorDetailsPage;
