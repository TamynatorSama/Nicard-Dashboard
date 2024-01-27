import { useSelector } from "react-redux";
import CustomInputField from "../../component/customInputField"
import { IonHome } from "../../component/icons";

const CardReplacementPage=()=>{

    const formState = useSelector((state) => state.cardRequestForm);

    return <div className="display-area w-full h-full px-10 flex flex-col">
    <div className="bread-crumps-grp mt-4 flex items-center gap-2 ">
      <IonHome />
      <p className="text-stone-400 text-[0.73rem] mt-[0.15rem] font-semibold">
        Home Page &nbsp;&nbsp;/ &nbsp;&nbsp;..&nbsp;&nbsp; /&nbsp;&nbsp;
        Dashboard &nbsp;&nbsp;/&nbsp;&nbsp; ..&nbsp;&nbsp; /&nbsp;&nbsp;{" "}
        <span className="text-[#2baf50]">Card Replacement</span>{" "}
      </p>
    </div>
    <h1 className="mt-3 text-4xl font-medium">Replace Card</h1>
    <form action="/" className="mt-5 no-bars overflow-scroll h-full">
      <p className="text-[0.8rem] text-stone-600 font-bold">
        Verification Details
      </p>
      <p className="text-[0.7rem] text-stone-400 font-medium mb-4">
        Fill in the NIN and Date of Birth fields to get the <b>First Name</b>{" "}
        and <b>Last Name</b> fields
      </p>
      <div className="verification-details flex gap-5">
        <div className="ni">
          <CustomInputField
            type="tel"
            value={formState.nin}
            name="nin"
            maxLength={11}
            pattern="[0-9\s]{11}"
            inputMode="numeric"
          />
          <p className="text-[0.6rem] font-semibold mt-1 text-stone-400">
            This should be 11 digits long
          </p>
        </div>

        <CustomInputField
          type="date"
          label="Date of Birth"
          value={formState.date_of_birth}
          name="date_of_birth"
        />
      </div>
      <p className="text-[0.8rem] text-stone-600 font-bold mb-2 mt-6">
        Personal Details
      </p>
      <div className="personal-info-grp flex flex-col gap-5">
        <div className="name-grp flex gap-5">
          <CustomInputField
            value={formState.first_name}
            name="first_name"
            label="First Name"
            disabled={true}
          />
          <CustomInputField
            value={formState.last_name}
            name="last_name"
            label="Last Name"
            disabled={true}
          />
        </div>
        <CustomInputField
          value={formState.middle_name}
          name="middle_name"
          label="Middle Name"
          // disabled={true}
        />
        
 
      </div>

      <p className="text-[0.8rem] text-stone-600 font-bold mb-2 mt-6">
        Account information
      </p>
      <div className="personal-info-grp flex flex-col gap-5">
          <CustomInputField
            value={formState.account_number}
            name="account_number"
            label="Account Number"
          />

        
 
      </div>
     
      
      
      <button
        type="submit"
        className="outline-white w-full grid place-content-center bg-[#2baf50] max-w-[20rem] text-white font-bold py-3 rounded-md mt-7"
      >
        {/* {isLoading?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="4"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>: */}
        Renew Card
        {/* } */}
      </button>
    </form>
  </div>
}

export default CardReplacementPage