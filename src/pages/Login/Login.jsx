import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        console.log(response);
    };

    return (
        <div className="flex justify-center">
            <div className="form px-6 sm:w-[400px] py-12">
                <h1 className="text-4xl text-center font-medium text-dark-color">
                    Sign in to Amantinas.
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
                                <FaGoogle className="text-white font-bold text-xl sm:text-3xl mr-2" />
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

                <p className="text-sm mt-10 text-center">
                    Or sign in using your email address
                </p>

                <input
                    type="email"
                    className="mt-6 my-2 w-full p-3 rounded-lg outline-none text-lg"
                    placeholder="Your email"
                />
                <input
                    type="password"
                    className="my-2 w-full p-3 rounded-lg outline-none text-lg"
                    placeholder="Your password"
                />

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
                    onClick={() => navigate("/home")}
                    className="cursor-pointer mt-6 w-full py-3 px-6 rounded-lg bg-primary-blue text-white text-md flex justify-center items-center"
                >
                    SIGN IN
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
