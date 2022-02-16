import React, { useState } from "react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import AddBoardModal from "../../components/Modals/AddBoardModal";

const ProjectsBoardListing = () => {
    const [newBoardModalOpen, setNewBoardModalOpen] = useState(false);

    return (
        <DashboardWrapper title="My Boards">
            <div className="flex my-10 flex-wrap gap-4">
                {[15685443].map((id) => (
                    <Link
                        to={`/project-boards/${id}`}
                        key={id}
                        style={{
                            background: "url(/card-bg.jpg)",
                            backgroundSize: "cover",
                        }}
                        className="rounded w-full sm:w-auto text-white font-medium px-4 bg-slate-300 py-8 min-w-[200px]"
                    >
                        Board Name Here about
                    </Link>
                ))}
                <div
                    onClick={() => setNewBoardModalOpen(true)}
                    className="cursor-pointer rounded px-8 bg-slate-300 font-light
                     py-6 flex flex-col items-center text-dark-color"
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
