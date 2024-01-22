
// import CustomDropDown from "./customDropdown";
import { useState } from "react";
import Logo from "../assets/logo.svg";
const NavComponent = () => {
  let selectedStyle = 'text-2xl pt-4 pb-4 pl-6 pr-6 bg-green-500 rounded-md text-white mb-4 cursor-auto text-nowrap';
  let unselectedStyle = 'text-2xl text-gray-500 block mb-4 cursor-auto';

  const [selected, setSelected] = useState(0);

  function changeSelected(newIndex) {
    setSelected(newIndex);
  };

  return (
    <nav className="flex flex-col pl-8 pr-12 pt-10 gap-1 bg-green-bg h-screen w-1/4">
      <div className="flex items-center gap-5">
        <img src={Logo} className="h-full" alt="Nicard logo" />
        <div><h1 className="font-bold text-2xl text-nowrap text-white">Unity Bank</h1>
          <p className="text-stone-400 text-xs font-semibold">Vendor Id: 2882482484824</p></div>
      </div>

      <div className='ml-24 mt-8 flex flex-col gap-15'>
        <h1 className={selected === 0 ? selectedStyle : unselectedStyle} onClick={() => changeSelected(0)}>Dashboard</h1>
        <h1 className={selected === 1 ? selectedStyle : unselectedStyle} onClick={() => changeSelected(1)}>Renew Card</h1>
        <h1 className={selected === 2 ? selectedStyle : unselectedStyle} onClick={() => changeSelected(2)}>Replace Card</h1>
        <h1 className={selected === 3 ? selectedStyle : unselectedStyle} onClick={() => changeSelected(3)}>Block Card</h1>
      </div>



      {/* <CustomDropDown /> */}
    </nav>
  );
};
export default NavComponent;
