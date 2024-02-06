import { useDispatch, useSelector } from "react-redux";
import CustomDropDown from "../../../component/customDropdown";
import { CardRequestStatusList } from "../../../utils/requestStatus";
import { listUpdateThunk, updateReqestStatus } from "../../../app/appSlice";
import useAuth from "../../../utils/hooks/useAuth";
import { updateListModalState, updateModalInfo } from "../../../app/card_listing/listingFilterSlice";


const CardRequestListingCard = ({ listData }) => {

  let statusStyle = {};
  const dispatch = useDispatch()
  const auth = useAuth()


  let token = auth.token

  switch (listData.request_status[0].request_status_slug.split(" ")[0].toLowerCase()) {
    case "pending":
      statusStyle = {
        "background-color": "#ffe5c8",
        color: "#e3a57e",
      };
      break;
    case "done":
      statusStyle = {
        "background-color": "#d7f8f1",
        color: "#83c6b4",
      };
      break;
    case "processing":
      statusStyle = {
        "background-color": "#f2f1f6",
        color: "#838287",
      };
      break;
    case "approved":
      statusStyle = {
        "background-color": "#d4e4ff",
        color: "#636fbb",
      };
      break;
    case "ready":
      statusStyle = {
        "background-color": "#fee5ff",
        color: "#d1a8e0",
      };
      break;
    default:
      statusStyle = {
        "background-color": "rgba(239, 68, 68,0.9)",
        color: "white",
      };
      break;
  }

  const onChangeAction = (update) => {
    dispatch(updateReqestStatus(update))
    dispatch(listUpdateThunk({
      data: { request_id: update.request_id, status_id: update.request_status_id },
      old_status_id: update.old_status_id,
      token
    }))
    // listUpdateThunk
  }

  return (
    <div
      className="rounded-xl transition-all relative z-20 duration-200 flex items-center gap-4  p-2 cursor-pointer">
      <div className="w-11/12" onClick={()=>{
        dispatch(updateModalInfo({
          ...listData.user_info[0],
          request_type: listData.request_type[0].request_type_slug,
          request_status: listData.request_status[0].request_status_slug,
          ref_id: listData.id
        }))
        dispatch(updateListModalState(true))}} >
        <h1 className="text-[0.8rem] font-medium w-full text-stone-800 te">
          {listData.user_info[0].first_name + " " + listData.user_info[0].last_name}
        </h1>
        <p className="text-[0.7em] text-stone-500 w-full">{listData.user_info[0].phone_number}</p>
      </div>
      <h1 className="text-[0.8rem] font-medium text-stone-800 w-full">
        {listData.id}
      </h1>
      <h1 className="text-[0.8rem] font-medium w-4/5 text-stone-400">
        {new Date(listData.created_at).toLocaleDateString("en-us", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h1>

      <div className="w-10/12">
        <h1
          className={`text-[0.8rem] font-medium w-fit h-fit p-2 leading-none text-center rounded-2xl text-stone-400`}
          style={statusStyle}
        >
          {listData.request_status[0].request_status_slug}
        </h1>
      </div>
      <h1 className="text-[0.8rem] font-medium text-stone-700 w-2/5">
        {listData.request_type[0].request_type_slug}
      </h1>
      <div className="w-1/2">


        {Object.values(auth.roles).includes(7100) || Object.values(auth.roles).includes(7000) ? <CustomDropDown title="Actions"
        disabled={listData.request_status[0].step > CardRequestStatusList.find(ev=> ev.request_status_slug.toLowerCase() === "pending nimc verification").step || listData.request_status[0].step < CardRequestStatusList.find(ev=> ev.request_status_slug.toLowerCase() === "pending nimc verification").step}
         onChange={(value) => onChangeAction({
          request_id: listData.id,
          old_status_id: listData.request_status[0].id,
          request_status_id: CardRequestStatusList.find(ev => ev.request_status_slug.toLowerCase() === (value === "Approve" ? "Pending Bank Verification" : value).toLowerCase()).id
        })} optional_id={listData.id} items={CardRequestStatusList.filter(e => listData.request_status[0].step !== 7 && (e.request_status_slug.toLowerCase() === "denied" || e.request_status_slug.toLowerCase() === "pending bank verification")).map(e => {
          if (e.request_status_slug.toLowerCase() === "pending bank verification") {
            return "Approve"
          }
          return e.request_status_slug
        })} isAction={true} />

          : <CustomDropDown title="Actions" onChange={(value) => onChangeAction({
            request_id: listData.id,
            old_status_id: listData.request_status[0].id,
            request_status_id: CardRequestStatusList.find(ev => ev.request_status_slug.toLowerCase() === value.toLowerCase()).id
          })} optional_id={listData.id} items={CardRequestStatusList.filter(e => e.step > listData.request_status[0].step || (e.step === -1 && listData.request_status[0].step !== 7)).map(e => e.request_status_slug)} isAction={true} />}
      </div>
    </div>
  );
};
export default CardRequestListingCard;

{/* <CustomDropDown title="Actions" onChange={(value)=>onChangeAction({
        request_id: listData.id,
        old_status_id: listData.request_status[0].id,
        request_status_id: CardRequestStatusList.find(ev=> ev.request_status_slug.toLowerCase() === (value === "Aprrove"?"Pending Bank Verification":value).toLowerCase()).id
      })} optional_id={listData.id} items={CardRequestStatusList.filter(e=>e.step > listData.request_status[0].step || (e.step === -1 && listData.request_status[0].step !== 7)).map(e=>{
        if(e.request_status_slug.toLowerCase() === "pending bank verification"){
          return "Approve"
        }
        return e.request_status_slug})} isAction={true}/>} */}