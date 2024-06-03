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
    className="my-2 w-full rounded-sm p-2 outline-none border-black text-yellow-500 text-sm bg-transparent "
  ></input>
);

const Dashboard = () => {
  const {
    connectWallet,
    currentAccount,
    userBalance,
    marketSupply,
    reverseSupply,
    formData,
    sendToken,
    handleChange,
    loadingScreen,
  } = useContext(TokenContext);

  const handleSend = (e) => {
    const { recipient, amount, description } = formData;
    e.preventDefault();

    if (recipient == null || amount == null || description == null) {
      toast.error("Please fill out all the fields");
      return;
    } else if (!isValidAddress(recipient)) {
      toast.error("Please input a valid address");
      return;
    } else if (amount > 2000) {
      toast.error("Maximum transfer amount exceeded   Max:2000");
      return;
    } else if (amount < 1) {
      toast.error("Minimum transfer amount not met   Min:1");
      return;
    } else {
      sendToken();
    }
  };
  const isValidAddress = (address) => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
  };

  return (
    <div className="flex w-full justify-center item-center bg-[#F7F7F7]">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10 ">
          <h1 className="text-3xl sm:text-5xl py-0">
            FoterrePay: Revolutionizing <br />
            Payments with Blockchain
            <br />
          </h1>
          <p className="text-left mt-6 text-grey font-bold md:w-9/12 w-11/12 text-base">
            Fast Transaction | Maximum Safety | Fraud Prevention <br />
          </p>
          <p className="text-left mt-5 text-grey font-light md:w-9/12 w-11/12 text-base">
            We provide convenience and full-safety for your daily transaction
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#FFDE59] py-2 px-9 mx-4 rounded-full cursor-pointer hover:bg-[#F6C500]"
            >
              Connect Wallet
            </button>
          )}
          <ToastContainer />
          <div className="flex md:flex-row flex-col gap-5">
            <div className="bg-white p-5 justify-end items-start flex-col rounded-xl h-40 sm:w-50 w-full my-5 shadow-2xl ">
              <p className="text-lg text-yellow-500">Total Market Supply</p>
              <div className="mt-5 text-xl  text-yellow-500 font-semibold">
                {marketSupply} FOTE
              </div>
            </div>
            <div className="bg-white p-5 justify-end items-start flex-col rounded-xl h-40 sm:w-50 w-full my-5 shadow-2xl ">
              <p className="text-lg text-yellow-500">
                Reverse Transaction Supply
              </p>
              <div className="mt-5 text-xl text-yellow-500 font-semibold">
                {reverseSupply} FOTE
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
        <div className="p-3 justify-end items-start flex-col rounded-xl h-44 sm:w-96 w-full my-5 shadow-md bg-gradient-to-r from-yellow-950 via-yellow-800 to-yellow-500">
          <div className="flex justify-between flex-col w-full h-full">
            <div className="flex justify-between items-start">
              <p className="text-xl text-white">Balance </p>
            </div>
            <div>
              <p className="text-xl text-white">{userBalance} FOTE</p>
            </div>
            <div>
              <p className="font-light text-sm text-white">{currentAccount}</p>
              <p className="font-semibold text-lg mt-1 text-white">
                Sepolia Testnet
              </p>
            </div>
          </div>
        </div>
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center rounded-xl bg-white">
          <Input
            placeholder="Recipient Address"
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
            placeholder="Description"
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
              onClick={handleSend}
              className="text-white w-full mt-2 my-5 bg-[#FFDE59] py-2 px-9 mx-4 rounded-full cursor-pointer hover:bg-[#F6C500]"
            >
              Send FETO
            </button>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
