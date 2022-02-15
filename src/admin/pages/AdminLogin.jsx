import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    adminLoginAction,
} from "../../redux/actions/adminActions";

const AdminLogin = () => {
    const { admin, loading } = useSelector((state) => state.adminState);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailSubmit = async () => {
        setError("");
        const obj = { email, password };

        const res = await dispatch(adminLoginAction(obj));
        if (!res.success) {
            setError(res.message);
            return;
        }
    };

    useEffect(() => {
        if (admin._id) {
            navigate("/admin");
        }
    }, [admin, navigate]);


    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="form px-6 sm:w-[400px] py-12">
                <h1 className="text-4xl text-center font-medium text-dark-color">
                    Admin Login
                </h1>

                {error && (
                    <div className="bg-red-200 text-sm my-4 p-2 rounded-lg text-center text-red-500">
                        {error}!
                    </div>
                )}

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-6 my-2 w-full p-3 rounded-lg outline-none text-lg"
                    placeholder="Your email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="my-2 w-full p-3 rounded-lg outline-none text-lg"
                    placeholder="Your password"
                />

                <button
                    disabled={loading || email === "" || password === ""}
                    onClick={handleEmailSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6 w-full py-3 px-6 rounded-lg bg-primary-blue text-white text-md flex justify-center items-center"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            Loading...
                        </>
                    ) : (
                        <span>SIGN IN</span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
