
import dashboardIcon from "../assets/dashboard.svg";
import NewLogo from '../assets/newLogo.png'
import { FaSolidUsers, Logout, MaterialSymbolsAddCardOutlineRounded, MaterialSymbolsCreditCardGearOutline, MdiCreditCardRemoveOutline, MdiCreditCardSyncOutline } from "./icons";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../app/navigator/navigatorSlice";
import { Link, useLocation } from "react-router-dom";
import { resetFields } from "../app/card_request/requestFormSlice";
import useAuth from "../utils/hooks/useAuth";
import { clearData } from "../app/appSlice";
import { clearFilter } from "../app/card_listing/listingFilterSlice";
import { clearToken } from "../app/login/loginSlice";
import { resetForm } from "../app/access_control/createNewUserSlice";
import { clearList } from "../app/access_control/userList";
import { useEffect } from "react";
const NavComponent = () => {
  const currentNavIndex = useSelector((state)=>state.navigator.selectedPage)
  const dispatch = useDispatch()
  const authState = useAuth()
  const roles = Object.values(authState.roles)

  function changeSelected(newIndex) {
    dispatch(resetFields())
    dispatch(changePage(newIndex))
  };
  let okay = "asdas"

  const location = useLocation()
  useEffect(()=>{
    const pathName = location.pathname
    switch (pathName.toLowerCase()){
      case '/': 
      dispatch(changePage(0))
      break
      case '/requestcard':
        dispatch(changePage(1))
        break
        case '/renewcard':
        dispatch(changePage(2))
        break
        case '/replacecard':
        dispatch(changePage(3))
        break
        case '/blockcard':
        dispatch(changePage(4))
        break
        default:
          dispatch(changePage(5))
          break
    }
  },[location])



  return (
    <div className="w-fit lg:w-1/4 h-full bg-[#001a07] flex flex-col px-4 lg:px-[clamp(1em,2vw,2.5em)] py-10 ">
      <div className="flex items-center gap-3 justify-start">
        <img src={NewLogo} alt="Nicard Logo" className="w-[3em] object-contain" />
        <h1 className="hidden lg:block text-[#208a3d] text-2xl font-semibold">eIDCard</h1>
      </div>
      <div className="mt-10  flex flex-col gap-3">
        <Link to="/"  onClick={()=> changeSelected(0)} className={`flex items-center gap-2 ${currentNavIndex===0?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%] rounded-md cursor-pointer`}>
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
        {roles.includes(5100) ||roles.includes(7100)||roles.includes(9100)? <Link to="accessControl" onClick={()=> changeSelected(5)} className={`flex items-center gap-2 ${currentNavIndex ===5?"bg-[#2baf50] opacity-100":"opacity-70"} w-fit lg:w-full py-2 px-3 lg:px-[10%]  rounded-md cursor-pointer`}>
          <FaSolidUsers />
          <h2 className="hidden lg:block text-white font-medium">Access Control</h2>
        </Link>:<></>}
        
      </div>
      <div className="flex justify-center mt-auto h-fit lg:justify-between items-end cursor-pointer" onClick={()=>{
        dispatch(clearData())
        dispatch(clearFilter())
        dispatch(clearToken())
        dispatch(resetForm())
        dispatch(clearList())
      }}>
      <h2 className="hidden lg:block text-red-700 font-medium">Logout</h2>
      <Logout />
      </div>
    </div>
  );
};
export default NavComponent;
