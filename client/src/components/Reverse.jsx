/*
Author: Tan_Eng_Khon_TP063572
*/

import React, { useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import { Loader } from ".";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none border-black text-red-500 text-sm bg-transparent "
  ></input>
);

//To shorten address shown
const shortenAddress = (address) => {
  if (!address) return "";
  const start = address.slice(0, 9);
  const end = address.slice(-9);
  return `${start}...${end}`;
};

const FraudBoard = ({ recipient }) => {
  return (
    <div className="bg-red-500 m-4 flex flex-1 flex-col p-2 rounded-xl shadow-xl hover:shadow-2xl min-w-[450px] 2xl:max-w=[500px] sm:min-w-[270px] sm:max-w-[300px]">
      <div className="flex flex-col items-center w-full mt-3 ">
        <div className="justify-start w-full mb-2 p-2">
          <a
            href={`https://sepolia.etherscan.io/address/${recipient}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base text-white">
              Address: {shortenAddress(recipient)}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

const Reverse = () => {
  const { formData, handleChange, loadingScreen, fraudUser, reverseReport } =
    useContext(TokenContext);

  const handleReport = (e) => {
    const { recipient, amount, description } = formData;
    e.preventDefault();

    if (recipient == null || amount == null || description == null) {
      toast.error("Please fill out all the fields");
      return;
    } else if (!isValidAddress(recipient)) {
      toast.error("Please input a valid address");
      return;
    } else if (amount < 1) {
      toast.error("Minimum amount not met  Min:1");
      return;
    } else if (amount > 2000) {
      toast.error("Maximum amount exceeded  Max:2000");
      return;
    } else {
      reverseReport();
    }
  };
  const isValidAddress = (address) => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
  };
  const numberOfAddressToShow = 30; //Limit 30 Reported Address To Show

  return (
    <div className="flex flex-col w-full md:flex-row justify-center items-center bg-[#F7F7F7]">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 mt-20">
        <div className="flex-1 flex-col justify-start items-start">
          <h1 className="text-center text-3xl sm:text-5xl py-2">
            Fraud Awareness
          </h1>
          <p className="text-center my-2 font-light text-base">
            Your safety and security are of utmost importance to us, and we want
            to ensure you are informed and protected.
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-start items-center mt-6">
          <h3 className="text-2xl">
            Please be aware of the address shown below
          </h3>
          <div className="flex flex-wrap justify-center items-center mt-10">
            {fraudUser.slice(0, numberOfAddressToShow).map((address, index) => (
              <FraudBoard key={index} recipient={address} />
            ))}
          </div>
        </div>
        <div className="text-xl mt-10 mb-10">
          Report the user and get your funds back
        </div>
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center rounded-xl bg-white shadow-2xl">
          <h1 className="text-2xl text-red-400 font-bold mb-8">
            Report Fraud User
          </h1>
          <Input
            placeholder="Target Address"
            name="recipient"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder="Amount (FOTE)"
            name="amount"
            type="number"
            handleChange={handleChange}
          />
          <Input
            placeholder="Explanation"
            name="description"
            type="text"
            handleChange={handleChange}
          />
          <div className="h-[1px] w-full bg-gray-300 my-2" />
          {loadingScreen ? (
            <Loader />
          ) : (
            <button
              type="button"
              onClick={handleReport}
              className="text-white w-full mt-2 my-5 bg-red-300 py-2 px-9 mx-4 rounded-full cursor-pointer hover:bg-red-600"
            >
              Report
            </button>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Reverse;
