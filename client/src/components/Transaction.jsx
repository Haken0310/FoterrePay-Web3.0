/*
Author: Tan_Eng_Khon_TP063572
*/

import React, { useContext } from "react";

import { TokenContext } from "../context/TokenContext";

//Shorten address function
const shortenAddress = (address) => {
  if (!address) return "";
  const start = address.slice(0, 9);
  const end = address.slice(-8);
  return `${start}...${end}`;
};

const TransactionBoard = ({
  sender,
  recipient,
  timestamp,
  message,
  amount,
}) => {
  return (
    <div className="hover:bg-yellow-400 bg-white m-4 flex flex-1 flex-col p-3 rounded-md shadow-xl hover:shadow-2xl min-w-[450px] 2xl:max-w=[500px] sm:min-w-[270px] sm:max-w-[300px]">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="justify-start w-full mb-6 p-2 ">
          <a
            href={`https://sepolia.etherscan.io/address/${sender}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base hover:text-white">
              From: {shortenAddress(sender)}
            </p>
          </a>
          <a
            href={`https://sepolia.etherscan.io/address/${recipient}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-base hover:text-white">
              To: {shortenAddress(recipient)}
            </p>
          </a>
          <p className="mt-10 text-base text-xl">Amount: {amount} FOTE</p>
          {message && (
            <>
              <br />
              <p className="text-base">Message: {message}</p>
            </>
          )}

          <div className="p-2 px-8 w-max rounded-3xl mt-5 shadow-2xl">
            <p className="font-bold">{timestamp}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Transaction = () => {
  const { currentAccount, transaction } = useContext(TokenContext);

  const numberOfTransactionShow = 20; //Set showing latest 20 transactions limit
  return (
    <div
      id="transaction-section"
      className="flex w-full justify-center items-center 2xl:px-20 bg-[#F7F7F7] "
    >
      <div className="flex flex-col md:p-12 py-12 px-4 mt-10">
        {currentAccount ? (
          <h3 className="text-3xl sm:text-5xl py-0 text-center">
            Transaction History
          </h3>
        ) : (
          <h3 className="text-3xl text-center my-2">
            Please connect your wallet to access this section
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...transaction]
            .reverse()
            .slice(0, numberOfTransactionShow)
            .map((transaction, i) => (
              <TransactionBoard key={i} {...transaction} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
