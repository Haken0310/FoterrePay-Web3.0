/*
Author: Tan_Eng_Khon_TP063572
*/

import React from "react";

const GuideBoard = ({ num, title, subtitle }) => (
  <div
    className="flex flex-row justify-start items-start rounded-2xl bg-yellow-300 p-4 m-2 shadow-xl cursor-pointer hover:shadow-2xl"
    style={{ height: "125px", width: "700px", overflow: "hidden" }}
  >
    <div className="flex justify-center items-center mr-1 font-semibold ">
      {num}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg font-medium">{title}</h3>
      <p
        className="mt-2 mb-2 text-yellow-800 text-sm md:w-9/12 font-light"
        style={{ maxHeight: "100px", overflow: "hidden" }}
      >
        {subtitle}
      </p>
    </div>
  </div>
);

const Guide = () => (
  <div className="flex flex-col w-full md:flex-row justify-center items-center bg-[#F7F7F7]">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex-col justify-start items-start">
        <h1 className="text-3xl sm:text-5xl py-2">FoterrePay Guideline</h1>
        <p className="text-center my-2 font-light text-base">
          Please follow the instruction below to fully utilize our services
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center mt-6">
        <GuideBoard
          num="Step 1"
          title="Metamask Requirement"
          subtitle="Go to BrowserExtension and Install Metamask"
        />
        <GuideBoard
          num="Step 2"
          title="Add Sepolia Testnet"
          subtitle={
            <>
              Follow this link to add Sepolia Testnet:{" "}
              <a
                href="https://www.alchemy.com/overviews/how-to-add-sepolia-to-metamask"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Add Sepolia Testnet
              </a>
            </>
          }
        />
        <GuideBoard
          num="Step 3"
          title="Import FOTE Token On Metamask"
          subtitle="Copy and Paste the Address: 0x9e696d100f9dE2900033273f3b7bAfCDb55b46C7"
        />
      </div>
    </div>
  </div>
);

export default Guide;
