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
    min="1"
    max="2000"
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none border-black text-yellow-500 text-sm bg-transparent "
  ></input>
);

const MyWallet = () => {
  const {
    connectWallet,
    currentAccount,
    userBalance,
    marketSupply,
    reverseSupply,
    ownerSupply,
    formData,
    depositToken,
    withdrawToken,
    handleChange,
    loadingScreen,
  } = useContext(TokenContext);

  const handleDeposit = (e) => {
    const { recipient, amount, description } = formData;
    e.preventDefault();

    if (recipient == null || amount == null || description == null) {
      toast.error("Please fill out all the fields");
      return;
    } else if (!isValidAddress(recipient)) {
      toast.error("Please input a valid address");
      return;
    } else if (amount >= 3000) {
      toast.error("Maximum deposit amount exceeded  Max:3000");
      return;
    } else if (amount < 1) {
      toast.error("Minimum deposit amount not met  Min:1");
      return;
    } else {
      depositToken();
    }
  };

  const handleWithdraw = (e) => {
    const { recipient, amount, description } = formData;
    e.preventDefault();

    if (recipient == null || amount == null || description == null) {
      toast.error("Please fill out all the fields");
      return;
    } else if (!isValidAddress(recipient)) {
      toast.error("Please input a valid address");
      return;
    } else if (amount > 1000) {
      toast.error("Maximum withdrawal amount exceeded   Max:1000");
      return;
    } else if (amount < 50) {
      toast.error("Minimum withdrawal amount not met  Min:50");
      return;
    } else {
      withdrawToken();
    }
  };

  const isValidAddress = (address) => {
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    return addressRegex.test(address);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F7F7F7] ">
      <div className="text-3xl sm:text-5xl py-2">My Wallet</div>
      <div className="p-4 mt-16 justify-end items-start flex-col rounded-xl h-44 sm:w-96 w-full my-5 shadow-md bg-gradient-to-r from-yellow-950 via-yellow-800 to-yellow-500">
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
      <div>
        {!currentAccount && (
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#FFDE59] py-2 px-9 mx-4 rounded-full cursor-pointer hover:bg-[#F6C500]"
          >
            Connect Wallet
          </button>
        )}
      </div>
      <div className="flex justify-center gap-4 mb-10 mt-10">
        <div className=" bg-white p-4 py-7 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Owner Supply</h2>
          <p>{ownerSupply} FOTE</p>
        </div>

        <div className=" bg-white p-4 py-7 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Total Market Supply</h2>
          <p>{marketSupply} FOTE</p>
        </div>

        <div className=" bg-white p-4 py-7 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Total ReversePool Supply
          </h2>
          <p>{reverseSupply} FOTE</p>
        </div>
      </div>

      <div className="flex justify-around gap-20">
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center rounded-xl bg-white shadow-2xl">
          <h1 className="text-2xl text-yellow-400 font-bold mb-8">
            Deposit FOTE
          </h1>
          <Input
            placeholder="Your Address"
            name="recipient"
            type="text"
            handleChange={handleChange}
          />
          <Input
            placeholder="Amount (FOTE) To Deposit"
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
              onClick={handleDeposit}
              className="text-white w-full mt-2 my-5 bg-[#FFDE59] py-2 px-9 mx-4 rounded-full cursor-pointer hover:bg-[#F6C500]"
            >
              Deposit FETO
            </button>
          )}
          <ToastContainer />
        </div>

        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center rounded-xl bg-white shadow-2xl">
          <h1 className="text-2xl text-yellow-400 font-bold mb-8">
            Withdraw FOTE
          </h1>
          <Input
            placeholder="Your Address"
            name="recipient"
            type="text"
            handleChange={handleChange}
          />

          <Input
            placeholder="Amount (FOTE) To Withdraw"
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
              onClick={handleWithdraw}
              className="text-white w-full mt-2 my-5 bg-[#FFDE59] py-2 px-9 mx-4 rounded-full cursor-pointer hover:bg-[#F6C500]"
            >
              Withdraw FETO
            </button>
          )}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
