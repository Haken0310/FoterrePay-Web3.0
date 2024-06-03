/*
Author: Tan_Eng_Khon_TP063572
*/

import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

import logo from "../../images/logo.png";

const NavBarItems = ({ title, classprops, scrolltoId }) => {
  const handleClick = () => {
    if (scrolltoId) {
      console.log(`Handling click for scrolltoId: ${scrolltoId}`);
      const targetElement = document.getElementById(scrolltoId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };
  return (
    <li className={`mx-4 cursor-pointer ${classprops}`} onClick={handleClick}>
      {title}
    </li>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-2">
      <div className="md:flex-[0.8] flex-initial justify-center items-center">
        <a href="/homepage">
          <img src={logo} alt="logo" className="w-32 py-2 cursor-pointer"></img>
        </a>
      </div>
      <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <li className=" px-9 py-2 mx-3 rounded-full cursor-pointer hover:bg-[#FFDE59] hover:shadow-xl">
          <a href="/homepage">Home</a>
        </li>
        <li className=" px-9 py-2 mx-5 mr-9 rounded-full cursor-pointer hover:bg-[#FFDE59] hover:shadow-xl">
          <a href="/history"> History </a>
        </li>
        <li className="bg-[#FFDE59] py-2 px-9 mx-4 rounded-full cursor-pointer hover:bg-[#F6C500]">
          <a href="/mywallet">My Wallet</a>
        </li>
      </ul>

      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            fontSize={28}
            className="text-black md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-black md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md text-blac animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["My Wallet", "History"].map((item, index) => (
              <NavBarItems
                key={item + index}
                title={item}
                scrolltoId={item}
                classprops="my-2 text-lg"
              />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
