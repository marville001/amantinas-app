import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import DataTable from "../../components/DataTable/DataTable";
import AddUserModal from "../../components/Modals/AddUserModal";
import { loadUsersAction } from "../../redux/actions/usersActions";

const Users = () => {
    const { users } = useSelector((state) => state.usersState);
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUsersAction());
    }, [dispatch]);

    return (
        <DashboardWrapper title="Users">
            <div className="my-6 bg-white rounded-xl p-2 max-w-6xl">
                <DataTable
                    title="Activities"
                    btnText="Add User"
                    columnTitles={["firstname", "lastname", "role", "email", "Notes"]}
                    searchable={false}
                    showDownload={false}
                    data={users}
                    btnAction={() => setAddUserModalOpen(true)}
                />
            </div>
            <AddUserModal
                isOpen={addUserModalOpen}
                closeModal={() => setAddUserModalOpen(false)}
            />
        </DashboardWrapper>
    );
};

export default Users;
