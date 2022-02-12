import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { FaFacebookF, FaGoogle, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../redux/actions/userAuthActions";

const Login = () => {
    const { user, loading } = useSelector((state) => state.userAuthState);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    const handleEmailSubmit = async () => {
        setError("");
        const obj = { email, password };

        const res = await dispatch(userLoginAction(obj));
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
        if (localStorage.token) {
            navigate("/home");
        }
    }, [navigate]);

    return (
        <div className="flex justify-center">
            <div className="form px-6 sm:w-[400px] py-12">
                <h1 className="text-4xl text-center font-medium text-dark-color">
                    Sign In.
                </h1>
                <div className="flex space-x-5 my-6 justify-center">
                    <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
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
                        appId="1088597931155576"
                        autoLoad={true}
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
                {error}
                <div className="flex justify-center space-x-5 mt-5">
                    <label className="cursor-pointer flex items-center text-md">
                        <input
                            className="block w-4 h-4 text-lg mr-2"
                            type="checkbox"
                            name="check"
                            id=""
                        />{" "}
                        <span className="text-sm">Remember me</span>
                    </label>
                    <Link
                        to="/forgot-password"
                        className="cursor-pointer text-dark-color"
                    >
                        Forgot Password?
                    </Link>
                </div>

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

export default Login;
