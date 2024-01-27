
import NavComponent from "../../component/navComponent";
import { useSelector } from "react-redux";
import CardListingPage from "../card_listing";
import CardRequestPage from "../card_request";
import CardRenewPage from "../card_renew";
import CardReplacementPage from "../card_replace";
import CardBlockPage from "../card_block";
import AccessControlPage from "../access_control";

const NewDashboard = () => {

  const currentNavIndex = useSelector(state=>state.navigator.selectedPage)

  return (
    <main className="w-full h-svh flex">
      <NavComponent />
      {
        currentNavIndex ===0? <CardListingPage/> :currentNavIndex ===1? <CardRequestPage />:currentNavIndex ===2?<CardRenewPage/>:currentNavIndex ===3?<CardReplacementPage/>:currentNavIndex ===4?<CardBlockPage />:<AccessControlPage/>
      }
      
    </main>
  );
};
export default NewDashboard;
