
import NavComponent from "../../component/navComponent";
import { useDispatch, useSelector } from "react-redux";
import { appDataThunk, appLoadingState, cardListThunk, profileData } from "../../app/appSlice";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";
import { createUserModalState } from "../../app/access_control/createNewUserSlice";
import CreateNewUserModal from "../../component/createNewUserModal";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../utils/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import '../../utils/extensions'
import ViewInfoModal from "../card_listing/components/view_info_modal";

const NewDashboard = () => {
  const modalState = useSelector(createUserModalState)
  const listingModal = useSelector(state=>state.listFilter.showModal)
  const { isAuthenticated,token } = useAuth()
  const profile = useSelector(profileData)



    const location =  useLocation()


  const dispatch = useDispatch()
  
  useEffect(()=>{
    const execute = async()=>{
      dispatch(appDataThunk(token))
    }
    execute()
  },[dispatch,token])

  useEffect(()=>{
    const fetchCardRequests = async(bank_id)=>{
      dispatch(cardListThunk({token,bank_id}))
    }
    if(profile?.institution?.bank_data || profile?.institution?.institution_data){
      console.log(profile.institution?.bank_data)
      // if(profile.institution?.bank_data){
        fetchCardRequests([].first(profile.institution?.bank_data??[])?.id ?? [].first(profile.institution?.institution_data??[])?.id)
      // }
      // else{
      //   fetchCardRequests(?.id)
      // }
    }
  },[token,profile,dispatch])

  // const currentNavIndex = useSelector(state=>state.navigator.selectedPage)
  const loadingState = useSelector(appLoadingState)
  if(!isAuthenticated){
    return <Navigate to='/login' state={{from:location}} replace/>
  }
  else if(loadingState === "loading"){
    return (
      <main className="w-full h-svh flex justify-center items-center">
        <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </main>
    )
  }else{
    return (
      <main className="w-full h-svh flex relative">
        {modalState ? <CreateNewUserModal />:<></>}
        {listingModal ? <ViewInfoModal />:<></>}
        <NavComponent />
        <Outlet />
        <ToastContainer />
      </main>
    );
  }

};
export default NewDashboard;
