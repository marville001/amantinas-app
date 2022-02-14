import React from "react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";
import { createScrapeAction } from "../../redux/actions/scrapesActions";

const ScrapingTool = () => {
    const { isCreatingScrape, scrapes } = useSelector(
        (state) => state.scrapeState
    );
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

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        setError("");
        const obj = {
            investorId: user._id,
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
            pricerange: [pricerange.min, pricerange.max],
            squarefeets: [squarefeets.min, squarefeets.max],
        };

        const res = await dispatch(createScrapeAction(obj));
        if (!res.success) {
            setError(res.message);
        } else {
            setSuccess(res.message);

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        }
    };

    console.log({ scrapes });
    return (
        <DashboardWrapper title="Scraping Tool">
            <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
                <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
                    Scraping
                </h2>
                <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />
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
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 lg:max-w-4xl mx-auto my-10">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
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
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
                                Zip code
                            </p>
                            <input
                                type="text"
                                value={zipcode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
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
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                            />
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
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
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
                                Address (single home search)
                            </p>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
                                Since
                            </p>
                            <select
                                type="text"
                                value={since}
                                onChange={(e) => setSince(e.target.value)}
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
                            >
                                <option value="any">Any</option>
                                <option value="14days">14 Days</option>
                                <option value="7days">7 Days</option>
                                <option value="3days">3 Days</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
                                House Type
                            </p>
                            <select
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
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
                            <p className=" text-brown-color font-medium">
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
                                        className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                    />
                                    <p className="text-brown-color">Min</p>
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
                                        className="border w-full border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                                    />
                                    <p className="text-brown-color">Max</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1">
                            <p className=" text-brown-color font-medium">
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
                                        className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                    />
                                    <p className="text-brown-color">Min</p>
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
                                        className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                    />
                                    <p className="text-brown-color">Max</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-5">
                            <div className="flex flex-col w-full">
                                <p className=" text-brown-color font-medium">
                                    Bedrooms
                                </p>
                                <input
                                    type="number"
                                    value={bedrooms}
                                    onChange={(e) =>
                                        setBedrooms(e.target.value)
                                    }
                                    className="border  w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <p className=" text-brown-color font-medium">
                                    Bathrooms
                                </p>
                                <input
                                    type="number"
                                    value={bathrooms}
                                    onChange={(e) =>
                                        setBathrooms(e.target.value)
                                    }
                                    className="border  w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-1 w-full">
                            <p className=" text-brown-color font-medium">
                                Execute
                            </p>
                            <select
                                type="text"
                                value={execute}
                                onChange={(e) => setExecute(e.target.value)}
                                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
                            >
                                <option value="once">Once</option>
                                <option value="daily">Daily</option>
                                <option value="once-week">Once Per Week</option>
                                <option value="once-month">
                                    Once Per Month
                                </option>
                            </select>
                        </div>

                        <div className="">
                            <button
                                disabled={isCreatingScrape}
                                onClick={handleSubmit}
                                className="disabled:opacity-50 disabled:cursor-not-allowed bg-primary-blue flex justify-center items-center p-2 px-10 w-full text-white rounded-md uppercase text-md"
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
            </div>
        </DashboardWrapper>
    );
};

export default ScrapingTool;
