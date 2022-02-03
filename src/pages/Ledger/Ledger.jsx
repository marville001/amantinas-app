import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

import DataTable from "../../components/DataTable/DataTable";

const Ledger = () => {
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
    </DashboardWrapper>
  );
};

export default Ledger;
