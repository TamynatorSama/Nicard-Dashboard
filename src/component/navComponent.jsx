
import greenLogo from "../assets/green_logo.svg";
import dashboardIcon from "../assets/dashboard.svg";

import { FaSolidUsers, MaterialSymbolsAddCardOutlineRounded, MaterialSymbolsCreditCardGearOutline, MdiCreditCardRemoveOutline, MdiCreditCardSyncOutline } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../app/navigator/navigatorSlice";
import { Link } from "react-router-dom";
const NavComponent = () => {
  const currentNavIndex = useSelector((state)=>state.navigator.selectedPage)
  const dispatch = useDispatch()


  function changeSelected(newIndex) {
    dispatch(changePage(newIndex))
  };

  return (
    <div className="w-fit lg:w-1/4 h-full bg-[#001a07]  px-4 lg:px-[clamp(1em,2vw,2.5em)] py-10 ">
      <div className="flex items-center gap-4 justify-start">
        <img src={greenLogo} alt="Nicard Logo" className="w-[3em]" />
        <h1 className="hidden lg:block text-[#208a3d] text-xl font-semibold">Nicard</h1>
      </div>
      <div className="mt-10  flex flex-col gap-3">
        <Link to="/"  onClick={()=> changeSelected(0)} className={`flex target:text-red-500 items-center gap-2 ${currentNavIndex===0?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%] rounded-md cursor-pointer`}>
          <img src={dashboardIcon} alt="Nicard Logo" className="w-[1.3em] h-[1.3em]" />
          <h2 className="hidden lg:block text-white font-medium">Dashbaord</h2>
        </Link>
        <Link to="requestCard" onClick={()=> changeSelected(1)} className={`flex items-center gap-2 ${currentNavIndex ===1?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%]  rounded-md cursor-pointer`}>
          <MaterialSymbolsAddCardOutlineRounded />
          <h2 className="hidden lg:block text-white font-medium">Request</h2>
        </Link>
        <Link to="renewCard"  onClick={()=> changeSelected(2)} className={`flex items-center gap-2 ${currentNavIndex ===2?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%]  rounded-md cursor-pointer`}>
          <MdiCreditCardSyncOutline />
          <h2 className="hidden lg:block text-white font-medium">Renew</h2>
        </Link>
        <Link to="replaceCard" onClick={()=> changeSelected(3)} className={`flex items-center gap-2 ${currentNavIndex ===3?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%]  rounded-md cursor-pointer`}>
          <MaterialSymbolsCreditCardGearOutline />
          <h2 className="hidden lg:block text-white font-medium">Replace</h2>
        </Link>
        <Link to="blockCard" onClick={()=> changeSelected(4)} className={`flex items-center gap-2 ${currentNavIndex ===4?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%]  rounded-md cursor-pointer`}>
          <MdiCreditCardRemoveOutline />
          <h2 className="hidden lg:block text-white font-medium">Block</h2>
        </Link>
        <Link to="accessControl" onClick={()=> changeSelected(5)} className={`flex items-center gap-2 ${currentNavIndex ===5?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%]  rounded-md cursor-pointer`}>
          <FaSolidUsers />
          <h2 className="hidden lg:block text-white font-medium">Access Control</h2>
        </Link>
        
      </div>
    </div>
  );
};
export default NavComponent;
