import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../app/appSlice";
import { createCardRequestThunk } from "../utils/commonThunk";
import { resetNameField, updateForm, validateNinThunk } from "../app/card_request/requestFormSlice";
import CustomInputField from "./customInputField";


const RequestForm=({request_id})=>{
  const formState = useSelector((state) => state.cardRequestForm);
  const profile = useSelector(profileData)



  const dispatch = useDispatch()


  const verifyNin = ()=>{
    dispatch(validateNinThunk({
      data: {nin:formState.nin}
    }))
  }


  const updateRquestForm=(ev)=>{
    if(ev.target.name === 'nin'|| ev.target.name==='date_of_birth'){
      dispatch(resetNameField())
    }

    dispatch(updateForm({target:ev.target.name,value:ev.target.value}))
  }

  const submitForm=(ev)=>{
    ev.preventDefault()
    dispatch(createCardRequestThunk({
      request_type_id: request_id,
      first_name: formState.first_name,
      last_name: formState.last_name,
      middle_name: formState.middle_name,
      date_of_birth: formState.date_of_birth,
      nin: formState.nin,
      phone_number: formState.phone_number,
      bank_id: profile.institution.bank_data[0].id,
      branch_id: profile.institution.branch_code,
      card_type: formState.card_type
    }))
  }

    return (
        <div className="mt-5 no-bars overflow-scroll h-full">
        <p className="text-[0.8rem] text-stone-600 font-bold">
          Verification Details
        </p>
        <p className="text-[0.7rem] text-stone-400 font-medium mb-4">
          Fill in the NIN and Date of Birth fields to get the <b>First Name</b>{" "}
          and <b>Last Name</b> fields
        </p>
        <div className="verification-details flex flex-col">
          <div className="flex gap-5">
          <div className="ni w-full">
            <CustomInputField
              type="tel"
              onChange={updateRquestForm}
              value={formState.nin}
              name="nin"
              maxLength={11}
              pattern="[0-9\s]{11}"
              inputMode="numeric"
            />
            <p className="text-[0.6rem] font-semibold mt-1 text-stone-600 uppercase">
              NIN should be 11 digits long
            </p>
          </div>

          <CustomInputField
            type="date"
            label="Date of Birth"
            onChange={updateRquestForm}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().substring(0, 10)}
            value={formState.date_of_birth}
            name="date_of_birth"
          />
          </div>
          <button
          onClick={verifyNin}
          disabled={ formState.nin.length<11 || new Date(formState.date_of_birth) > new Date(new Date().setFullYear(new Date().getFullYear() - 16))}
          className="btn-custom outline-white disabled:bg-[#2baf50c7] w-full grid place-content-center bg-[#2baf50] max-w-[20rem] text-white font-bold py-3 rounded-md mt-4"
        >
          {formState.isLoadingValidation?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="4"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>:
          "Verify"
          }
          </button>
        </div>
        <form onSubmit={submitForm}>
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
          <div className="flex gap-5">
          <CustomInputField
            value={formState.middle_name}
            name="middle_name"
            label="Middle Name"
            onChange={updateRquestForm}
            disabled={true}
          />
          <CustomInputField
            value={formState.phone_number}
            name="phone_number"
            label="Phone Number"
            type="tel"
            maxLength={13}
              inputMode="numeric"
            onChange={updateRquestForm}
          />
          </div>
          
   
        </div>

        <p className="text-[0.8rem] text-stone-600 font-bold mb-2 mt-6">
          Account information
        </p>
        <div className="personal-info-grp flex gap-5">
          <select onChange={updateRquestForm} value={formState.card_type} name="card_type" className="max-w-[49%] text-sm font-medium text-stone-700">
            <option value="Select Card Type">--- Select Card Type ---</option>
            <option value="Prepaid">Prepaid</option>
            <option value="Debit Card">Debit Card</option>
          </select>
             {formState.card_type.includes("Debit") ?<CustomInputField
              value={formState.account_number}
              name="account_number"
              maxLength={11}
              onChange={updateRquestForm}
              label="Account Number"
            />:<></>}

          
   
        </div>
       
        
        
        <button
          type="submit"
          disabled={ formState.nin.length<11 || formState.first_name.length < 3|| formState.last_name.length < 3|| formState.middle_name.length < 3 || formState.phone_number.length < 3}
          className="outline-white btn-custom disabled:bg-[#2baf50c7] w-full grid place-content-center bg-[#2baf50] max-w-[20rem] text-white font-bold py-3 rounded-md mt-7"
        >
          {formState.isLoading?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="4"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>:
          "Request Card"
           }
        </button>
        </form>
      </div>
    )
}

export default RequestForm