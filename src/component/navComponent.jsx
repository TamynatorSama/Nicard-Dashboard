// import CustomDropDown from "./customDropdown";
// import { useState } from "react";
import greenLogo from "../assets/green_logo.svg";
import dashboardIcon from "../assets/dashboard.svg";
const NavComponent = () => {
  // let selectedStyle = 'text-2xl pt-4 pb-4 pl-6 pr-6 bg-green-500 rounded-md text-white mb-4 cursor-auto text-nowrap';
  // let unselectedStyle = 'text-2xl text-gray-500 block mb-4 cursor-auto';

  // const [selected, setSelected] = useState(0);

  // function changeSelected(newIndex) {
  //   setSelected(newIndex);
  // };

  return (
    <div className="max-w-[25em] h-full bg-[#001a07] px-10 py-10">
      <div className="flex items-center gap-4 justify-start">
        <img src={greenLogo} alt="Nicard Logo" className="w-[3em]" />
        <h1 className="text-[#208a3d] text-xl font-semibold">Nicard</h1>
      </div>
      <div className="mt-10 ">
        <div className="flex justify-center items-center gap-2 bg-[#2baf50] py-2 px-10 rounded-sm">
          <img src={dashboardIcon} alt="Nicard Logo" className="w-[1.3em] h-[1.3em]" />
          <h2 className="text-white font-medium">Dashbaord</h2>
        </div>
      </div>
    </div>
  );
};
export default NavComponent;
