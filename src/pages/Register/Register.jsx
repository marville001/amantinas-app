import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex justify-center">
      <div className="form w-[400px] py-12">
        <h1 className="text-4xl text-center font-medium text-dark-color">
          Sign up to Amantinas.
        </h1>
        <div className="flex space-x-5 my-6 justify-center">
          <div className="cursor-pointer p-2 px-6 rounded-lg bg-primary-blue text-white text-xl flex justify-center items-center">
            <FaGoogle className="text-white font-bold text-2xl mr-2" /> Sign up
            with Google
          </div>
          <div className="cursor-pointer p-3 px-4 rounded-lg bg-white font-bold text-primary-blue">
            <FaFacebookF className="text-primary-blue font-bold text-4xl mr-2" />
          </div>
        </div>

        <p className="text-lg mt-10 text-center">
          Or sign up using your email address
        </p>

        <input
          type="text"
          className="my-2 w-full p-3 rounded-lg outline-none"
          placeholder="Name"
        />
        <input
          type="email"
          className="my-2 w-full p-3 rounded-lg outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          className="my-2 w-full p-3 rounded-lg outline-none"
          placeholder="Password"
        />
        <input
          type="password"
          className="my-2 w-full p-3 rounded-lg outline-none"
          placeholder="Confirm password"
        />

        <div className="flex justify-center space-x-5 mt-5">
          <label className="cursor-pointer flex items-center text-md">
            <input
              className="block mt-1 w-10 h-10 text-lg mr-1"
              type="checkbox"
              name="check"
              id=""
            />{" "}
            <p>
              Creating an account means you are okay with our{" "}
              <a href="https://terms.com" className="text-dark-color" target="_blank" rel="noreferrer">
                Terms of Service
              </a>,<a href="https://terms.com" className="text-dark-color" target="_blank" rel="noreferrer">
                Privacy Policy
              </a> and our default <a href="https://terms.com" className="text-dark-color" target="_blank" rel="noreferrer">
                Notifications settings
              </a>
            </p>
          </label>
        </div>

        <button className="cursor-pointer mt-6 w-full py-3 px-6 rounded-lg bg-primary-blue text-white text-md flex justify-center items-center">
          SIGN UP
        </button>
        <p className="text-slate-700 mt-6 text-center">OR</p>

        <Link
          to="/"
          className="cursor-pointer mt-6 w-full py-3  px-6 rounded-lg bg-primary-blue text-white text-md flex justify-center items-center"
        >
          SIGN IN
        </Link>
      </div>
    </div>
  );
};

export default Register;
