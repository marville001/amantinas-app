import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    userLogoutAction,
    userRegisterAction,
} from "../../redux/actions/userAuthActions";
import useDarkMode from "../../hooks/useDarkMode";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

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

    const responseGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = async (response) => {
        if (response.userID) {
            setError("");
            const obj = { email: response.email };

            const res = await dispatch(userRegisterAction(obj, "facebook"));
            if (!res.success) {
                setError(res.message);
                return;
            }
        }
    };

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

    useEffect(() => {
        dispatch(userLogoutAction());
    }, [dispatch]);

    const [darkTheme, setDarkTheme] = useDarkMode();
    useEffect(() => {
        if (darkTheme) setDarkTheme(!darkTheme);
    }, [darkTheme, setDarkTheme]);

    return (
        <div className="flex justify-center">
            <div className="form px-6 sm:w-[400px] py-12">
                <h1 className="text-4xl text-center font-medium text-dark-blue-color">
                    Sign Up
                </h1>
                <div className="flex space-x-5 my-6 justify-center">
                    <GoogleLogin
                        clientId="202471176377-6j6tvqu6ulhuffe440snjbrg5e3bpilo.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                        render={(props) => (
                            <button
                                onClick={props.onClick}
                                disabled={props.disabled}
                                className={`
                                cursor-pointer p-2 px-4 sm:px-12 rounded-lg 
                                bg-primary-blue text-white flex justify-center 
                                items-center disabled:opacity-75
                                `}
                            >
                                <FaGoogle className="text-white font-bold text-xl sm:text-2xl mr-2" />
                                <span className="text-sm">
                                    Sign in with Google
                                </span>
                            </button>
                        )}
                    />

                    <FacebookLogin
                        appId="1626605131030552"
                        callback={responseFacebook}
                        fields="name,email,picture"
                        cssClass="cursor-pointer p-3 px-4 rounded-lg bg-white font-bold text-primary-blue"
                        textButton=""
                        icon={
                            <FaFacebookF className="text-primary-blue font-bold text-xl sm:text-4xl mr-2" />
                        }
                    />
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
                                className="text-dark-blue-color"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Terms of Service
                            </a>
                            ,
                            <a
                                href="https://terms.com"
                                className="text-dark-blue-color"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Privacy Policy
                            </a>{" "}
                            and our default{" "}
                            <a
                                href="https://terms.com"
                                className="text-dark-blue-color"
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
