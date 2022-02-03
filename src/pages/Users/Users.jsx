import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import DataTable from "../../components/DataTable/DataTable";

const Users = () => {
  return (
    <DashboardWrapper title="Users">
      <div className="my-6 bg-white rounded-xl p-2 max-w-6xl">
        
        <DataTable
          title="Activities"
          btnText="Add User"
          columnTitles={[
            "Name",
            "Job",
            "Role",
            "Email",
            "Notes",
          ]}
          searchable={false}
          showDownload={false}
        />
      </div>
    </DashboardWrapper>
  );
};

export default Users;
