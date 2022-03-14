import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { BiBath, BiBed } from "react-icons/bi";
import priceFormatter from "../../utils/priceFormatter";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { createTransactionAction } from "../../redux/actions/transactionsActions";

const AddTransactionModal = ({ isOpen, closeModal = () => {} }) => {
    const { homes } = useSelector((state) => state.homesState);
    const { user } = useSelector((state) => state.userAuthState);
    const { isCreatingTransaction } = useSelector(
        (state) => state.transactionsState
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [recurring, setRecurring] = useState(false);
    const [customInterval, setCustomInterval] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("false");
    const [error, setError] = useState("");
    const [connectedHome, setConnectedHome] = useState("");
    const [homeDets, setHomeDets] = useState({});

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setHomeDets({});
        setConnectedHome("");
        setTitle("");
        setDescription("");
        setDate("");
        setType("");
        setAmount("");
        setStartDate("");
        setEndDate("");
        setError("");
        setRecurring(false);
        closeModal();
    };

    const handleSubmit = async () => {
        setError("");

        const obj = {
            title,
            investorId:
                user.type && user.type === "subuser"
                    ? user.investorId
                    : user?._id,
            homeId: connectedHome,
            description,
            amount,
            date,
            recurring,
            type,
        };

        if (recurring) {
            obj.startDate = startDate;
            obj.endDate = endDate;
            obj.isCustom = isCustom;
            obj.interval = customInterval;
        }

        const res = await dispatch(createTransactionAction(obj));
        if (!res.success) {
            setError(res.message);
        } else {
            handleCloseModal();
        }
    };

    useEffect(() => {
        if (connectedHome === "") {
            setHomeDets({});
        } else {
            const dets = homes.find(
                (home) => home._id === connectedHome && home.isManaged === true
            );
            setHomeDets(dets);
        }
    }, [connectedHome, homes]);

    return (
        <Modal size="3xl" isOpen={isOpen} closeModal={handleCloseModal}>
            <div className="text-center text-white text-2xl mb-4">
                New Transaction
            </div>

            {error && (
                <div className="text-center bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}

            <div className="flex space-x-4">
                <div className="flex-1">
                    <h2 className="text-white my-4">Connected Home</h2>

                    <div className="mr-8 mb-2">
                        <label htmlFor="home_" className="text-white ">
                            Select Managed Home
                        </label>
                        {homes?.filter((home) => home.isManaged === true)
                            .length === 0 ? (
                            <div className="my-4 px-3">
                                <p className="text-md text-white">
                                    No Managed Home Yet
                                </p>
                            </div>
                        ) : (
                            <select
                                value={connectedHome}
                                onChange={(e) =>
                                    setConnectedHome(e.target.value)
                                }
                                name="home_"
                                className="p-1 px-2"
                            >
                                <option value=""></option>
                                {homes
                                    ?.filter((home) => home.isManaged === true)
                                    .map((home, i) => (
                                        <option key={i} value={home._id}>
                                            {home.name}
                                        </option>
                                    ))}
                            </select>
                        )}
                    </div>
                    {connectedHome && (
                        <div className="mr-8 p-2 bg-white rounded-lg pb-5">
                            <img
                                className="w-full h-40 object-cover rounded-lg"
                                src={`${
                                    homeDets?.images
                                        ? process.env.REACT_APP_STATIC_URL +
                                          homeDets?.images[0]
                                        : ""
                                }`}
                                alt=""
                            />
                            <div className="mt-3 mb-2 flex justify-between">
                                <h2 className="text-dark-color font-bold">
                                    {homeDets?.name}
                                </h2>
                            </div>

                            <div className="flex items-center space-x-2 my-2">
                                <HiOutlineLocationMarker className="text-md text-primary-blue cursor-pointer" />
                                <p className="text-primary-blue text-sm font-light">
                                    {homeDets?.location}
                                </p>
                            </div>

                            <div className="flex justify-between pr-5">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 my-2">
                                        <BiBed className="text-md text-primary-blue cursor-pointer" />
                                        <p className="text-dark-color text-sm font-light">
                                            {homeDets?.bedrooms}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2 my-2">
                                        <BiBath className="text-md text-primary-blue cursor-pointer " />
                                        <p className="text-dark-color text-sm font-light">
                                            {homeDets?.bathrooms}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-dark-color font-medium font-sm">
                                    {priceFormatter(homeDets?.price)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex flex-1 flex-col space-y-2">
                        <label className="text-white text-md">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="
        outline-none p-1 px-2 text-sm !rounded bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                        />
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 my-2">
                        <label className="text-white text-md">
                            Description
                        </label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                        />
                    </div>

                    <div className="flex flex-1 flex-col space-y-2 my-2">
                        <label className="text-white text-md">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                        />
                    </div>

                    <div className="flex flex-1 flex-col space-y-2 my-2">
                        <label className="text-white text-md">
                            Date of transaction
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                        />
                    </div>

                    <div className="flex flex-1 flex-col space-y-2 my-2">
                        <label className="text-white text-md">
                            Type of transaction
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="
        outline-none p-1 text-sm rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                        >
                            <option value="">Select Type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div className="flex flex-1 flex-col space-y-2 my-2 py-2">
                        <label className="text-white text-md">
                            <input
                                type="checkbox"
                                value={recurring}
                                onChange={(e) => setRecurring(e.target.checked)}
                                className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color mr-2
        "
                            />
                            Recurring Transaction?
                        </label>
                    </div>
                    {recurring && (
                        <>
                            <div className="flex space-x-2">
                                <div className="flex flex-1 flex-col space-y-2 my-2">
                                    <label className="text-white text-md">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                        className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                                    />
                                </div>

                                <div className="flex flex-1 flex-col space-y-2 my-2">
                                    <label className="text-white text-md">
                                        End Date{" "}
                                        <span className="text-xs">
                                            {" "}
                                            (optional)
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                        className="
        outline-none p-1 text-sm !rounded px-2 bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                                    />
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col space-y-2 my-2">
                                <div className="text-white text-md flex justify-between">
                                    <p>Date Interval</p>
                                    <label
                                        htmlFor="custom"
                                        className="flex space-x-2 items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            name="custom"
                                            checked={isCustom}
                                            onChange={(e) =>
                                                setIsCustom(e.target.checked)
                                            }
                                        />
                                        <span>Custom</span>
                                    </label>
                                </div>
                                {isCustom ? (
                                    <div className="flex justify-between space-x-5 pr-6 items-center">
                                        <h4 className="text-md text-white">
                                            Every
                                        </h4>
                                        <input
                                            value={customInterval}
                                            onChange={(e) =>
                                                setCustomInterval(
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            className="w-auto"
                                        />
                                        <h4 className="text-md text-white">
                                            Days
                                        </h4>
                                    </div>
                                ) : (
                                    <select
                                        value={customInterval}
                                        onChange={(e) =>
                                            setCustomInterval(e.target.value)
                                        }
                                        className="
outline-none p-1 text-sm rounded px-2 bg-light-blue ring-1 
ring-dark-color text-dark-color
"
                                    >
                                        <option value="">Select Type</option>
                                        <option value="monthly">Month</option>
                                        <option value="weekly">Week</option>
                                        <option value="bi-weekly">
                                            Bi- Weekly
                                        </option>
                                    </select>
                                )}
                            </div>
                        </>
                    )}

                    <div className="flex  space-y-2 my-4 justify-center">
                        <button
                            disabled={isCreatingTransaction}
                            onClick={handleSubmit}
                            className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8 flex items-center"
                        >
                            {isCreatingTransaction ? (
                                <>
                                    <FaSpinner className="animate-spin mr-4" />{" "}
                                    <span className="capitalize">
                                        Loading...
                                    </span>
                                </>
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default AddTransactionModal;
