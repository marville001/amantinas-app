import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from "../../redux/actions/usersActions";
import { FaSpinner } from "react-icons/fa";

const AddUserModal = ({ isOpen, title, size, closeModal = () => {} }) => {
    const { isCreatingUser } = useSelector((state) => state.usersState);
    const { user } = useSelector((state) => state.userAuthState);
    
    const [sundayFree, setSundayFree] = useState(true);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [weekDayFromTime, setWeekDayFromTime] = useState("");
    const [weekDayToTime, setWeekDayToTime] = useState("");
    const [satFromTime, setSatFromTime] = useState("");
    const [satToTime, setSatToTime] = useState("");
    const [sunFromTime, setSunFromTime] = useState("");
    const [sunToTime, setSunToTime] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setRole("");
        setWeekDayFromTime("");
        setWeekDayToTime("");
        setSatFromTime("");
        setSatToTime("");
        setSunFromTime("");
        setSunToTime("");
        closeModal();
    };

    const handleCreateUser = async () => {
        setError("");
        const obj = {
            firstname,
            lastname,
            email,
            role,
            weekDayFromTime,
            weekDayToTime,
            satFromTime,
            satToTime,
            sundayFree,
            investorId: user.type && user.type === "subuser"? user.investorId : user?._id
        };
        if (!sundayFree) {
            obj.sunFromTime = sunFromTime;
            obj.sunToTime = sunToTime;
        }

        const res = await dispatch(addUserAction(obj));
        if (!res.success) {
            setError(res.message);
        } else {
            handleCloseModal();
        }
    };

    return (
        <Modal
            title="New User"
            size="xl"
            isOpen={isOpen}
            closeModal={handleCloseModal}
        >
            {error && (
                <div className="text-center bg-red-200 rounded-lg text-red-500 my-4 text-sm p-1">
                    {error}
                </div>
            )}
            <div className="flex sm:items-center sm:space-x-3  flex-col sm:flex-row -mt-6 ">
                <div className="flex flex-1 flex-col space-y-2">
                    <label className="text-white text-xl">First Name</label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 my-2 sm:my-4">
                    <label className="text-white text-xl">Last Name</label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                    />
                </div>
            </div>
            <div className="flex sm:items-center sm:space-x-3  flex-col sm:flex-row">
                <div className="flex flex-1 flex-col space-y-2 my-2 sm:my-4">
                    <label className="text-white text-xl">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                    />
                </div>
                <div className="flex flex-1 flex-col space-y-2 my-2 sm:my-4">
                    <label className="text-white text-xl">Role</label>
                    <select
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="
        outline-none p-2 rounded-md bg-light-blue ring-1 
        ring-dark-color text-dark-color
        "
                    >
                        <option value="">Select Role</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-1 flex-col space-y-2 my-2 sm:my-4">
                <label className="text-white text-xl">Schedule</label>

                <div className="flex flex-col items-center space-y-3 border p-3 rounded-sm">
                    <div className="flex flex-col space-y-1 w-full">
                        <p className=" text-white font-light">
                            Monday - Friday
                        </p>
                        <div className="flex gap-5 flex-col sm:flex-row">
                            <div className="flex flex-col-reverse sm:flex-col w-full">
                                <input
                                    type="time"
                                    value={weekDayFromTime}
                                    onChange={(e) =>
                                        setWeekDayFromTime(e.target.value)
                                    }
                                    className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                />
                                <p className="text-white text-xs mt-1">From</p>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-col w-full">
                                <input
                                    type="time"
                                    value={weekDayToTime}
                                    onChange={(e) =>
                                        setWeekDayToTime(e.target.value)
                                    }
                                    className="border w-full border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                                />
                                <p className="text-white text-xs mt-1">To</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1 w-full">
                        <p className=" text-white font-light">Saturday</p>
                        <div className="flex gap-5 flex-col sm:flex-row">
                            <div className="flex flex-col-reverse sm:flex-col w-full">
                                <input
                                    type="time"
                                    value={satFromTime}
                                    onChange={(e) =>
                                        setSatFromTime(e.target.value)
                                    }
                                    className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                />
                                <p className="text-white text-xs mt-1">From</p>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-col w-full">
                                <input
                                    type="time"
                                    value={satToTime}
                                    onChange={(e) =>
                                        setSatToTime(e.target.value)
                                    }
                                    className="border w-full border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                                />
                                <p className="text-white text-xs mt-1">To</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1 w-full">
                        <p className=" text-white font-light">Sunday</p>
                        <div className="flex justify-start my-2 items-center">
                            <input
                                checked={sundayFree}
                                onChange={(e) =>
                                    setSundayFree(e.target.checked)
                                }
                                type="checkbox"
                                className="w-4 h-4"
                            />{" "}
                            <span className="text-white ml-2">Free</span>
                        </div>
                        <div className="flex gap-5 flex-col sm:flex-row">
                            <div className="flex flex-col-reverse sm:flex-col w-full">
                                <input
                                    type="time"
                                    value={sunFromTime}
                                    onChange={(e) =>
                                        setSunFromTime(e.target.value)
                                    }
                                    disabled={sundayFree}
                                    className="border w-full disabled:bg-slate-300 border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                                />
                                <p className="text-white text-xs mt-1">From</p>
                            </div>
                            <div className="flex flex-col-reverse sm:flex-col w-full">
                                <input
                                    type="time"
                                    value={sunToTime}
                                    onChange={(e) =>
                                        setSunToTime(e.target.value)
                                    }
                                    disabled={sundayFree}
                                    className="border w-full disabled:bg-slate-300 border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                                />
                                <p className="text-white text-xs mt-1">To</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex  space-y-2 my-4 justify-center">
                <button
                    disabled={isCreatingUser}
                    onClick={handleCreateUser}
                    className="disabled:opacity-50 disabled:cursor-not-allowed uppercase px-16 tracking-wider py-2 bg-dark-color text-white text-lg rounded-md mt-8 flex items-center"
                >
                    {isCreatingUser ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            <span className="capitalize">Loading...</span>
                        </>
                    ) : (
                        <span>Create</span>
                    )}
                </button>
            </div>
        </Modal>
    );
};

export default AddUserModal;
