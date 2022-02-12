import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../redux/actions/userAuthActions";

const Register = () => {
    const { user, isCreatingUser } = useSelector(
        (state) => state.userAuthState
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [checkTerms, setCheckTerms] = useState("");

    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEmailSubmit = async () => {
        setError("");
        const obj = { name, email, password };

        if (!checkTerms) {
            setError("Please accept our terms and condition");
            return;
        }

        if (password !== cPassword) {
            setError("Passwords did not match");
            return;
        }

        const res = await dispatch(userRegisterAction(obj));
        if (!res.success) {
            setError(res.message);
            return;
        }
    };

    useEffect(() => {
        if (user._id) {
            navigate("/home");
        }
    }, [user, navigate]);

    return (
        <div className="flex justify-center">
            <div className="form px-6 sm:w-[400px] py-12">
                <h1 className="text-4xl text-center font-medium text-dark-color">
                    Sign Up
                </h1>
                <div className="flex space-x-5 my-6 justify-center">
                    <div className="cursor-pointer p-2 px-4 sm:px-12 rounded-lg bg-primary-blue text-white flex justify-center items-center">
                        <FaGoogle className="text-white font-bold text-lg sm:text-2xl mr-2" />
                        <span className="text-sm">Sign up with Google</span>
                    </div>
                    <div className="cursor-pointer p-3 px-4 rounded-lg bg-white font-bold text-primary-blue">
                        <FaFacebookF className="text-primary-blue font-bold text-xl sm:text-4xl mr-2" />
                    </div>
                </div>

                <div className="mt-10">
                    {error && (
                        <div className="bg-red-200 text-sm my-4 p-2 rounded-lg text-center text-red-500">
                            {error}!
                        </div>
                    )}

                    <p className="text-sm text-center">
                        Or sign up using your email address
                    </p>
                </div>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-6  text-lg my-2 w-full p-3 rounded-lg outline-none"
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" text-lg my-2 w-full p-3 rounded-lg outline-none"
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" text-lg my-2 w-full p-3 rounded-lg outline-none"
                    placeholder="Password"
                />
                <input
                    type="password"
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                    className=" text-lg my-2 w-full p-3 rounded-lg outline-none"
                    placeholder="Confirm password"
                />

                <div className="flex justify-center space-x-5 mt-5">
                    <label className="cursor-pointer flex items-center text-md">
                        <input
                            className="block mt-1 w-10 h-10 text-lg mr-1"
                            type="checkbox"
                            name="check"
                            value={checkTerms}
                            onChange={(e) => setCheckTerms(e.target.checked)}
                            id=""
                        />{" "}
                        <p>
                            Creating an account means you are okay with our{" "}
                            <a
                                href="https://terms.com"
                                className="text-dark-color"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Terms of Service
                            </a>
                            ,
                            <a
                                href="https://terms.com"
                                className="text-dark-color"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Privacy Policy
                            </a>{" "}
                            and our default{" "}
                            <a
                                href="https://terms.com"
                                className="text-dark-color"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Notifications settings
                            </a>
                        </p>
                    </label>
                </div>

                <button
                    disabled={
                        isCreatingUser ||
                        !checkTerms ||
                        email === "" ||
                        password === "" ||
                        name === "" ||
                        cPassword === ""
                    }
                    onClick={handleEmailSubmit}
                    className="disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6 w-full py-3 px-6 rounded-lg bg-primary-blue text-white text-md flex justify-center items-center"
                >
                    {isCreatingUser ? (
                        <>
                            <FaSpinner className="animate-spin mr-4" />{" "}
                            Loading...
                        </>
                    ) : (
                        <span>SIGN UP</span>
                    )}
                </button>
                <Link
                    to="/"
                    className="
           py-3  px-6 rounded-lg text-primary-blue text-sm flex justify-center items-center"
                >
                    click to sign in
                </Link>
            </div>
        </div>
    );
};

export default Register;
