
import NavComponent from "../../component/navComponent";
import { useDispatch, useSelector } from "react-redux";
import CardListingPage from "../card_listing";
import CardRequestPage from "../card_request";
import CardRenewPage from "../card_renew";
import CardReplacementPage from "../card_replace";
import CardBlockPage from "../card_block";
import AccessControlPage from "../access_control";
import { appDataThunk, appLoadingState,cardListThunk } from "../../app/appSlice";
import { ThreeDots } from "react-loader-spinner";
import { useEffect } from "react";

const NewDashboard = () => {
  const profileData = useSelector(state=>state.app.profileData)
  const authState = useSelector(state=>state.authReducer)


  let token = authState.token
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
    if(profileData?.institution?.bank_data){
      fetchCardRequests(profileData.institution.bank_data[0].id)
    }
  },[token,profileData,dispatch])

  const currentNavIndex = useSelector(state=>state.navigator.selectedPage)
  const loadingState = useSelector(appLoadingState)

  if(loadingState === "loading"){
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
    
      <main className="w-full h-svh flex">
        <NavComponent />
        {
          currentNavIndex ===0? <CardListingPage/> :currentNavIndex ===1? <CardRequestPage />:currentNavIndex ===2?<CardRenewPage/>:currentNavIndex ===3?<CardReplacementPage/>:currentNavIndex ===4?<CardBlockPage />:<AccessControlPage/>
        }
        
      </main>
    );
  }

};
export default NewDashboard;
