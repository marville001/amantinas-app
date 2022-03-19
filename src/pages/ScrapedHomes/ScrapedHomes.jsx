import React, { useEffect } from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import HomeCard from "../../components/HomeCard/HomeCard";

import ListCard from "../../components/ListCard/ListCard";
import { useDispatch, useSelector } from "react-redux";
import ViewTypeHeader from "../../components/ViewTypeHeader/ViewTypeHeader";
import { FaSpinner } from "react-icons/fa";
import { getHomesAction } from "../../redux/actions/homesActions";

const ScrapedHomes = () => {
    const { user } = useSelector((state) => state.userAuthState);
    const { viewType } = useSelector((state) => state.appState);
    const { scrapedHomes, loadingScrapedHomes } = useSelector(
        (state) => state.homesState
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getHomesAction({
                investorId:
                    user.type && user.type === "subuser"
                        ? user.investorId
                        : user?._id,
                scraped: true,
            })
        );
    }, [dispatch, user?._id, user.investorId, user.type]);

    return (
        <DashboardWrapper title="Scraping Homes">
            <div className="my-6 bg-white rounded-xl p-4 max-w-6xl dark:bg-gray-primary-color">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-blue-color dark:text-white">
                    Scraping Homes
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-blue-color bg-dark-blue-color dark:border-white dark:bg-white" />

                <ViewTypeHeader />
                {loadingScrapedHomes && (
                    <div className="flex justify-center my-4">
                        <FaSpinner className="animate-spin mr-4 text-2xl" />
                    </div>
                )}

                {scrapedHomes?.length <= 0 ? (
                    <div className="text-center py-4 text-lg text-slate-900 font-medium rounded-md bg-yellow-300">
                        <h3>No Scraped homes yet from your scrapes</h3>
                    </div>
                ) : viewType === "cards" ? (
                    <div className="px-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
                        {scrapedHomes
                            ?.filter((h) => h.scraped === true)
                            .map((home, idx) => (
                                <HomeCard key={home._id} home={home} />
                            ))}
                    </div>
                ) : (
                    <div className="md:px-12 flex flex-col space-y-2">
                        {scrapedHomes
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
