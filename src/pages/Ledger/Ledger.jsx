import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

import DataTable from "../../components/DataTable/DataTable";
import AddTransactionModal from "../../components/Modals/AddTransactionModal";
import { getHomesAction } from "../../redux/actions/homesActions";

const Ledger = () => {
    const { user } = useSelector((state) => state.userAuthState);

    const [addTransModalOpen, setAddTransModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomesAction({ investorId: user?._id }));
    }, [dispatch, user?._id]);

    return (
        <DashboardWrapper title={"Ledger"}>
            <div className="my-6">
                <DataTable
                    title="Activities"
                    btnText="Add Transaction"
                    columnTitles={[
                        "Account",
                        "Date",
                        "Merchant",
                        "Amount",
                        "Category",
                        "Property",
                        "Notes",
                    ]}
                    btnAction={() => setAddTransModalOpen(true)}
                />
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
