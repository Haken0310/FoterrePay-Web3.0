/*
Author: Tan_Eng_Khon_TP063572
*/

import logo from "../../images/logo.png";
const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 ">
      <div className="w-full flex sm:flex-row flex-col justify-between items-center -my-1">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 w-full mt-5">
          <p className="text-base font-light ">Author: Tan Eng Khon TP063572</p>
          <p className="text-base font-light ">Final Year Project</p>
          <p className="text-base font-light ">Web3.0 Project</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
