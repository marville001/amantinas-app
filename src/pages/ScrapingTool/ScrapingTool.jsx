import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import { createScrapeAction } from "../../redux/actions/scrapesActions";
import { get } from "../../utils/http";

const ScrapingTool = () => {
    const { isCreatingScrape } = useSelector((state) => state.scrapeState);
    const { user } = useSelector((state) => state.userAuthState);

    const [country, setCountry] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [since, setSince] = useState("any");
    const [type, setType] = useState("house");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [execute, setExecute] = useState("once");
    const [from, setFrom] = useState("");
    const [pricerange, setPriceRange] = useState({
        min: "",
        max: "",
    });
    const [squarefeets, setSquareFeet] = useState({
        min: "",
        max: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [scrapes, setScrapes] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setError("");
        const obj = {
            investorId:
                user.type && user.type === "subuser"
                    ? user.investorId
                    : user?._id,
            country,
            state,
            city,
            zipcode,
            address,
            since,
            type,
            bedrooms,
            bathrooms,
            execute,
            from,
            pricerange: [pricerange.min, pricerange.max],
            squarefeets: [squarefeets.min, squarefeets.max],
        };

        const res = await dispatch(createScrapeAction(obj));
        if (!res.success) {
            setError(res.message);
        } else {
            setSuccess(res.message);
            loadScrapes();
            setTimeout(() => {
                setSuccess("");
            }, 3000);
        }
    };

    const loadScrapes = useCallback(async () => {
        setLoading(true);
        try {
            const investorId =
                user.type && user.type === "subuser"
                    ? user.investorId
                    : user?._id;
            const data = await get(`scrape/${investorId}`);
            setScrapes(data.scrapes);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [user?._id, user?.investorId, user?.type]);

    useEffect(() => {
        if (user?._id) loadScrapes();
    }, [user?._id, loadScrapes]);

    return (
        <DashboardWrapper title="Scraping Tool">
            <div className="my-6 bg-white dark:bg-gray-primary-color rounded-xl p-4 max-w-7xl">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-blue-color dark:text-white">
                    Scraping
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-blue-color bg-dark-blue-color dark:border-white dark:bg-white" />
                {error && (
                    <div className="text-center max-w-4xl mx-auto bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="text-center max-w-4xl mx-auto bg-green-200 rounded-lg text-green-500 my-4 text-sm p-1">
                        {success}
                    </div>
                )}
                <div className="flex flex-col space-y-1 lg:max-w-4xl mx-auto mt-10">
                    <p className=" text-brown-color font-medium dark:text-white">
                        Address (single home search)
                    </p>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue dark:bg-dark-primary-color dark:text-white"
                    />
                    <br />
                    <hr className="mt-6 border-[1px] border-brown-color opacity-70 dark:border-white" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 lg:max-w-4xl mx-auto my-6">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium dark:text-white">
                                Country
                            </p>
                            {/* <select
                                type="text"
                                className="border text-primary-blue border-primary-blue 
                outline-none bg-light-blue rounded-md p-2"
                            >
                                <option value="one">One</option>
                            </select> */}
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="border border-primary-blue outline-none bg-light-blue rounded-md 
                                p-2 text-primary-blue dark:bg-dark-primary-color dark:text-white"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium dark:text-white">
                                Zip code
                            </p>
                            <input
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue dark:bg-dark-primary-color dark:text-white"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium dark:text-white">
                                State
                            </p>
                            {/* <select
                type="text"
                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
              >
                <option value="one">One</option>
              </select> */}
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue
                                dark:bg-dark-primary-color dark:text-white
                                "
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium dark:text-white">
                                City
                            </p>
                            {/* <select
                                type="text"
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
                            >
                                <option value="one">One</option>
                            </select> */}
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue
                                dark:bg-dark-primary-color dark:text-white
                                "
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium dark:text-white">
                                Since
                            </p>
                            <select
                                type="text"
                                value={since}
                                onChange={(e) => setSince(e.target.value)}
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2 dark:bg-dark-primary-color dark:text-white"
                            >
                                <option value="any">Any</option>
                                <option value="14days">14 Days</option>
                                <option value="7days">7 Days</option>
                                <option value="3days">3 Days</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium dark:text-white">
                                House Type
                            </p>
                            <select
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2 dark:bg-dark-primary-color dark:text-white"
                            >
                                <option value="">Select House Type</option>
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="multi-family">
                                    Multi-family
                                </option>
                                <option value="townhomes">Townhomes</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col space-y-1 w-full">
                            <p className=" text-brown-color font-medium dark:text-white">
                                Price Range
                            </p>
                            <div className="flex gap-5">
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        value={pricerange.min}
                                        onChange={(e) =>
                                            setPriceRange((pre) => ({
                                                ...pre,
                                                min: e.target.value,
                                            }))
                                        }
                                        className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2  text-primary-blue dark:bg-dark-primary-color dark:text-white"
                                    />
                                    <p className="text-brown-color dark:text-white">Min</p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        value={pricerange.max}
                                        onChange={(e) =>
                                            setPriceRange((pre) => ({
                                                ...pre,
                                                max: e.target.value,
                                            }))
                                        }
                                        className="border w-full border-primary-blue outline-none text-primary-blue 
                                        bg-light-blue rounded-md p-2 dark:bg-dark-primary-color dark:text-white"
                                    />
                                    <p className="text-brown-color dark:text-white">Max</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium dark:text-white">
                                Square Feets
                            </p>
                            <div className="flex gap-5">
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        value={squarefeets.min}
                                        onChange={(e) =>
                                            setSquareFeet((pre) => ({
                                                ...pre,
                                                min: e.target.value,
                                            }))
                                        }
                                        className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 
                                        text-primary-blue dark:bg-dark-primary-color dark:text-white"
                                    />
                                    <p className="text-brown-color dark:text-white">Min</p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <input
                                        type="text"
                                        value={squarefeets.max}
                                        onChange={(e) =>
                                            setSquareFeet((pre) => ({
                                                ...pre,
                                                max: e.target.value,
                                            }))
                                        }
                                        className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 
                                        text-primary-blue dark:bg-dark-primary-color dark:text-white"
                                    />
                                    <p className="text-brown-color dark:text-white">Max</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-5">
                            <div className="flex flex-col w-full">
                                <p className=" text-brown-color font-medium dark:text-white">
                                    Bedrooms
                                </p>
                                <input
                                    type="number"
                                    value={bedrooms}
                                    onChange={(e) =>
                                        setBedrooms(e.target.value)
                                    }
                                    className="border  w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 
                                    text-primary-blue dark:bg-dark-primary-color dark:text-white"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className=" text-brown-color font-medium dark:text-white">
                                    Bathrooms
                                </p>
                                <input
                                    type="number"
                                    value={bathrooms}
                                    onChange={(e) =>
                                        setBathrooms(e.target.value)
                                    }
                                    className="border  w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 
                                    text-primary-blue dark:bg-dark-primary-color dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1 w-full">
                            <p className=" text-brown-color font-medium dark:text-white">
                                Execute
                            </p>
                            <select
                                type="text"
                                value={execute}
                                onChange={(e) => setExecute(e.target.value)}
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2
                                 dark:bg-dark-primary-color dark:text-white"
                            >
                                <option value="once">Once</option>
                                <option value="daily">Daily</option>
                                <option value="once-week">Once Per Week</option>
                                <option value="once-month">
                                    Once Per Month
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col space-y-1 w-full">
                            <p className=" text-brown-color font-medium dark:text-white">
                                Scrape From
                            </p>
                            <select
                                type="text"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2
                                dark:bg-dark-primary-color dark:text-white"
                            >
                                <option></option>
                                <option value="realtor">Realtor</option>
                                <option value="zillow">Zillow</option>
                            </select>
                        </div>

                        <div className="">
                            <button
                                disabled={isCreatingScrape}
                                onClick={handleSubmit}
                                className="disabled:opacity-50 disabled:cursor-not-allowed bg-primary-blue flex justify-center items-center p-2
                                 px-10 w-full text-white rounded-md uppercase text-md dark:bg-dark-primary-color"
                            >
                                {isCreatingScrape ? (
                                    <>
                                        <FaSpinner className="animate-spin mr-4" />{" "}
                                        <span className="capitalize">
                                            Loading...
                                        </span>
                                    </>
                                ) : (
                                    <span>scrape</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <h2 className="text-lg my-4 text-dark-blue-color dark:text-white">All Scrapes</h2>

                <table className="w-full overflow-auto">
                    {/* Title */}
                    <thead className="lg:border-2 lg:border-opacity-70  lg:border-brown-color bg-light-blue dark:bg-gray-secondary-color">
                        <tr>
                            {[
                                "Country",
                                "Zip code",
                                "State",
                                "City",
                                "Address",
                                "Since",
                                "Type",
                                "Price",
                                "Feets",
                                "Beds",
                                "Baths",
                                "Execute",
                                "",
                            ]?.map((col, idx) => (
                                <th key={idx} className="py-2">
                                    <h3 className="text-sm capitalize dark:text-white">
                                        {col}
                                    </h3>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {loading ? (
                        <tr className="flex justify-center">
                            <td
                                colSpan={12}
                                className="flex justify-center my-4"
                            >
                                <FaSpinner className="animate-spin mr-4 text-xl" />
                            </td>
                        </tr>
                    ) : (
                        <tbody className="my-6">
                            {scrapes.length > 0 &&
                                scrapes.map((scrape, idx) => (
                                    <tr
                                        key={idx}
                                        className="py-3 hover:bg-light-blue dark:hover:bg-gray-secondary-color cursor-pointer"
                                    >
                                        <td className="px-2 py-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.country || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.zipcode || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.state || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.city || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.address || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.since || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.type || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.pricerange.length > 0
                                                ? scrape.pricerange[0] +
                                                  " - " +
                                                  scrape.pricerange[1]
                                                : "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.squarefeets.length > 0
                                                ? scrape.squarefeets[0] +
                                                  " - " +
                                                  scrape.squarefeets[1]
                                                : "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.bedrooms || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.bathrooms || "N/B"}
                                        </td>
                                        <td className="px-2 lg:px-4 first-line:text-sm font-light dark:text-white">
                                            {scrape.execute || "N/B"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    )}
                    {/* Table End*/}
                </table>
            </div>
        </DashboardWrapper>
    );
};

export default ScrapingTool;
