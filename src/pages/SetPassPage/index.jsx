import React, { useEffect, useState } from "react";

import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    userLoginAction,
    userLogoutAction,
} from "../../redux/actions/userAuthActions";
import { post } from "../../utils/http";
import { USER_LOGIN } from "../../redux/types/users";

const SetPassPage = () => {
    const { user } = useSelector((state) => state.userAuthState);

    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = async () => {
        setError("");
        const obj = { cPassword, password };

        if(cPassword !== password){
            setError("Passwords do not match")
            return
        }

        try {
            setLoading(true)
            const data = await post(`sub-user/activate/${token}`, {password});
            localStorage.setItem("token", data.token)
            dispatch({
                type: USER_LOGIN.SUCCESS,
                user: data.user,
            });
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message);
            setTimeout(() => {
                setError("")
            }, 6000);
        }
    };

    useEffect(() => {
        if (user._id) {
            navigate("/home");
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(userLogoutAction());
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <h1 className="text-4xl font-medium text-dark-color">
                Please Create a password
            </h1>
            <div className="form px-6 sm:w-[400px]">
                <div className="mt-10">
                    {error && (
                        <div className="bg-red-200 text-sm my-4 p-2 rounded-lg text-center text-red-500">
                            {error}!
                        </div>
                    )}
                </div>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="my-2 w-full p-3 rounded-lg outline-none text-lg"
                    placeholder="Your password"
                />
                <input
                    type="email"
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    className="mt-6 my-2 w-full p-3 rounded-lg outline-none text-lg"
                    placeholder="Confirm your password"
                />

                <button
                    disabled={loading || cPassword === "" || password === ""}
                    onClick={handleSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6 w-full py-3 px-6 rounded-lg bg-primary-blue text-white text-md flex justify-center items-center"
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            Loading...
                        </>
                    ) : (
                        <span>Continue</span>
                    )}
                </button>
                {/* <p className="text-slate-700 mt-6 text-center">OR</p> */}

                <Link
                    to="/register"
                    className="cursor-pointer mt-6 w-full py-3  px-6 rounded-lg bg-primary-blue text-white text-md flex justify-center items-center"
                >
                    SIGN UP
                </Link>
            </div>
        </div>
    );
};

export default SetPassPage;
