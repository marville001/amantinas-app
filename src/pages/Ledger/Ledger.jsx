import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

import DataTable from "../../components/DataTable/DataTable";

const Ledger = () => {
  return (
    <DashboardWrapper>
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
    </DashboardWrapper>
  );
};

export default Ledger;
