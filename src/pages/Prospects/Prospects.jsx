import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";
import ListCard from "../../components/ListCard/ListCard";
import AddProspectModal from "../../components/Modals/AddProspectModal";
import ViewTypeHeader from "../../components/ViewTypeHeader/ViewTypeHeader";
import { getHomesAction } from "../../redux/actions/homesActions";

const Prospects = () => {
    const { viewType } = useSelector((state) => state.appState);
    const { user } = useSelector((state) => state.userAuthState);
    const { homes, loading } = useSelector((state) => state.homesState);
    const [addProspectModalOpen, setAddProspectModalOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHomesAction({ investorId: user.type && user.type === "subuser"? user.investorId : user?._id }));
    }, [dispatch, user?._id, user.type, user.investorId]);

    return (
        <DashboardWrapper title="Prospects">
            <div className="my-6 bg-white dark:bg-gray-primary-color rounded-xl p-4 max-w-6xl">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-blue-color dark:text-white">
                    Prospects
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-blue-color bg-dark-blue-color dark:border-white dark:bg-white" />

                <div className="flex justify-end my-4">
                    <button
                        onClick={() => setAddProspectModalOpen(true)}
                        className="px-8 py-2 bg-primary-blue rounded-lg text-white uppercase dark:bg-dark-primary-color"
                    >
                        Add prospect
                    </button>
                </div>

                <ViewTypeHeader />
                {loading && (
                    <div className="flex justify-center my-4">
                        <FaSpinner className="animate-spin mr-4 text-2xl" />
                    </div>
                )}

                {viewType === "cards" ? (
                    <div className={`px-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16`}>
                        {homes
                            ?.filter((h) => h.category === "prospect" && h.isArchived === false)
                            .map((home, idx) => (
                                <HomeCard key={home._id} home={home} />
                            ))}
                    </div>
                ) : (
                    <div className="md:px-12 flex flex-col space-y-2">
                        {homes
                            ?.filter((h) => h.category === "prospect" && h.isArchived === false)
                            .map((home, idx) => (
                                <ListCard key={home._id} home={home} />
                            ))}
                    </div>
                )}
            </div>
            <AddProspectModal
                title={"New Propspect"}
                size="sm"
                isOpen={addProspectModalOpen}
                closeModal={() => setAddProspectModalOpen(false)}
            />
        </DashboardWrapper>
    );
};

export default Prospects;
