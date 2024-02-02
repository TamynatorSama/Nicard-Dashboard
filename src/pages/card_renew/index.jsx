import { useSelector } from "react-redux";
import CustomInputField from "../../component/customInputField";
import { IonHome } from "../../component/icons";
import RequestForm from "../../component/requestForm";
import { requestTypes } from "../../utils/reqestTypes";

const CardRenewPage=()=>{
    const formState = useSelector((state) => state.cardRequestForm);

  return (
    <div className="display-area w-full h-full px-10 flex flex-col">
      <div className="bread-crumps-grp mt-4 flex items-center gap-2 ">
        <IonHome />
        <p className="text-stone-400 text-[0.73rem] mt-[0.15rem] font-semibold">
          Home Page &nbsp;&nbsp;/ &nbsp;&nbsp;..&nbsp;&nbsp; /&nbsp;&nbsp;
          Dashboard &nbsp;&nbsp;/&nbsp;&nbsp; ..&nbsp;&nbsp; /&nbsp;&nbsp;{" "}
          <span className="text-[#2baf50]">Card Renew</span>{" "}
        </p>
      </div>
      <h1 className="mt-3 text-4xl font-medium">Renew Card</h1>
      <RequestForm request_id={requestTypes.find(val=>val.request_type_slug.toLowerCase() === "renew").id} button_name="Renew Card" />
    </div>
  );
}
export default CardRenewPage