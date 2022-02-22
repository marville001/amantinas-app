import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";

import ListCard from "../../components/ListCard/ListCard";
import { useSelector } from "react-redux";
import ViewTypeHeader from "../../components/ViewTypeHeader/ViewTypeHeader";
import { FaSpinner } from "react-icons/fa";

const ScrapedHomes = () => {
    const { viewType } = useSelector((state) => state.appState);
    const { homes, loading } = useSelector((state) => state.homesState);

    return (
        <DashboardWrapper title="Scraping Homes">
            <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
                    Scraping Homes
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />

                <ViewTypeHeader />
                {loading && (
                    <div className="flex justify-center my-4">
                        <FaSpinner className="animate-spin mr-4 text-2xl" />
                    </div>
                )}

                {viewType === "cards" ? (
                    <div className="px-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
                        {homes
                            ?.filter((h) => h.scraped === true)
                            .map((home, idx) => (
                                <HomeCard key={home._id} home={home} />
                            ))}
                    </div>
                ) : (
                    <div className="md:px-12 flex flex-col space-y-2">
                        {homes
                            ?.filter((h) => h.scraped === true)
                            .map((home, idx) => (
                                <ListCard key={home._id} home={home} />
                            ))}
                    </div>
                )}
            </div>
        </DashboardWrapper>
    );
};

export default ScrapedHomes;
