import React from "react";
import DashboardWrapper from "../../components/DashboardWrapper/DashboardWrapper";

const ScrapingTool = () => {
  return (
    <DashboardWrapper title="Scraping Tool">
      <div className="my-6 bg-white rounded-xl p-4 max-w-6xl">
        <h2 className="text-md font-bold mb-2 ml-3 fo text-dark-color">
          Scraping
        </h2>
        <hr className="border-0 h-[2px] my-2 opacity-50 border-dark-color bg-dark-color" />
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 lg:max-w-4xl mx-auto my-10">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-1">
              <p className=" text-brown-color font-medium">Country</p>
              <select
                type="text"
                className="border text-primary-blue border-primary-blue 
                outline-none bg-light-blue rounded-md p-2"
              >
                <option value="one">One</option>
                <option value="one">Two</option>
                <option value="one">Three</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <p className=" text-brown-color font-medium">Zip code</p>
              <input
                type="text"
                className="border border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className=" text-brown-color font-medium">State</p>
              <select
                type="text"
                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
              >
                <option value="one">One</option>
                <option value="one">Two</option>
                <option value="one">Three</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <p className=" text-brown-color font-medium">City</p>
              <select
                type="text"
                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
              >
                <option value="one">One</option>
                <option value="one">Two</option>
                <option value="one">Three</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <p className=" text-brown-color font-medium">Since</p>
              <select
                type="text"
                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
              >
                <option value="one">One</option>
                <option value="one">Two</option>
                <option value="one">Three</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <p className=" text-brown-color font-medium">Type</p>
              <select
                type="text"
                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
              >
                <option value="one">One</option>
                <option value="one">Two</option>
                <option value="one">Three</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-1 w-full">
              <p className=" text-brown-color font-medium">Price Range</p>
              <div className="flex gap-5">
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                  />
                  <p className="text-brown-color">Min</p>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="border w-full border-primary-blue outline-none text-primary-blue bg-light-blue rounded-md p-2"
                  />
                  <p className="text-brown-color">Max</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <p className=" text-brown-color font-medium">Square Feets</p>
              <div className="flex gap-5">
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                  />
                  <p className="text-brown-color">Min</p>
                </div>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    className="border w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                  />
                  <p className="text-brown-color">Max</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-5">
              <div className="flex flex-col w-full">
                <p className=" text-brown-color font-medium">Bedrooms</p>
                <input
                  type="text"
                  className="border  w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                />
                <p className="text-brown-color">Min</p>
              </div>
              <div className="flex flex-col w-full">
                <p className=" text-brown-color font-medium">Bathrooms</p>
                <input
                  type="text"
                  className="border  w-full border-primary-blue outline-none bg-light-blue rounded-md p-2 text-primary-blue"
                />
                <p className="text-brown-color">Max</p>
              </div>
            </div>

            <div className="flex flex-col space-y-1 w-full">
              <p className=" text-brown-color font-medium">Execute</p>
              <select
                type="text"
                className="border text-primary-blue border-primary-blue outline-none bg-light-blue rounded-md p-2"
              >
                <option value="one">One</option>
                <option value="one">Two</option>
                <option value="one">Three</option>
              </select>
            </div>

            <div className="">
              <button className="bg-primary-blue p-2 px-10 w-full text-white rounded-md uppercase text-md">
                scrape
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default ScrapingTool;
