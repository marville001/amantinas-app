import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import AddBoardModal from "../../components/Modals/AddBoardModal";
import { getBoardsAction } from "../../redux/actions/boardsActions";

const ProjectsBoardListing = () => {
    const { user } = useSelector((state) => state.userAuthState);
    const { boards, loading } = useSelector((state) => state.boardsState);

    const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getBoardsAction({
                investorId:
                    user.type && user.type === "subuser"
                        ? user.investorId
                        : user?._id,
            })
        );
    }, [dispatch, user?._id, user.type, user.investorId]);

    return (
        <DashboardWrapper title="My Boards">
            {loading && (
                <div>
                    <FaSpinner className="animate-spin" />
                </div>
            )}
            <div className="flex my-10 flex-wrap gap-4">
                {boards?.map((board) => (
                    <Link
                        to={`/project-boards/${board._id}`}
                        key={board._id}
                        className="
                        rounded w-full sm:w-auto text-white font-medium px-4 
                        bg-dark-blue-color py-8 min-w-[200px]"
                    >
                        {board.name}
                    </Link>
                ))}
                <div
                    onClick={() => setNewBoardModalOpen(true)}
                    className="cursor-pointer rounded px-8 bg-white font-light
                     py-6 flex flex-col items-center text-primary-blue"
                >
                    <HiOutlinePlusCircle className="w-6 h-6" />
                    <span className="text-sm font-medium">
                        Create New Board
                    </span>
                </div>
            </div>

            <AddBoardModal
                title={"New Board"}
                size="lg"
                isOpen={newBoardModalOpen}
                closeModal={() => setNewBoardModalOpen(false)}
            />
        </DashboardWrapper>
    );
};

export default ProjectsBoardListing;
