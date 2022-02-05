import React, { useState } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import DataTable from "../../components/DataTable/DataTable";
import AddUserModal from "../../components/Modals/AddUserModal";

const Users = () => {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  return (
    <DashboardWrapper title="Users">
      <div className="my-6 bg-white rounded-xl p-2 max-w-6xl">
        <DataTable
          title="Activities"
          btnText="Add User"
          columnTitles={["Name", "Job", "Role", "Email", "Notes"]}
          searchable={false}
          showDownload={false}
          btnAction={()=>setAddUserModalOpen(true)}
        />
      </div>
      <AddUserModal
        title={"New User"}
        size="sm"
        isOpen={addUserModalOpen}
        closeModal={() => setAddUserModalOpen(false)}
      />
    </DashboardWrapper>
  );
};

export default Users;
