import { useDispatch, useSelector } from "react-redux"
import { createNewUserThunk, getBankBranchThunk, requestForm, resetForm, updateFormState, updateState } from "../app/access_control/createNewUserSlice"
import CustomInputField from "./customInputField"
import { CloseBtn, FaSolidLoader } from "./icons"
import { useEffect } from "react"
import { profileData } from "../app/appSlice"
import useAuth from "../utils/hooks/useAuth"

const CreateNewUserModal = () => {
  const form = useSelector(requestForm)
  const createState = useSelector(state=>state.createNewUser)
  const profile = useSelector(profileData)
  const authState = useAuth()
  
  const dispatch = useDispatch()

  const updateRequestForm=(ev)=>{
    dispatch(updateFormState({target:ev.target.name,value:ev.target.value}))

  }

  const submitCreationForm=(ev)=>{
    ev.preventDefault()
    if(Object.values(authState.roles).includes(7100 || 7000)){
      dispatch(createNewUserThunk({
        url: 'createNimcUser',
        data:{
        bank_id: profile?.institution?.institution_data[0].id,
        assigned_roles: form.roles == 7100 ? {"Bank_Admin": 7100}:{"Bank_User": 7000},
        first_name:form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
        email: form.email,
        password: form.password,
        branch_id: form.branch
      }}))
    }else{
      dispatch(createNewUserThunk({
        url: 'createBankUser',
        data:{
        bank_id: profile?.institution?.bank_data[0].id,
        assigned_roles: form.roles == 5100 ? {"Bank_Admin": 5100}:{"Bank_User": 5000},
        first_name:form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
        email: form.email,
        password: form.password,
        branch_code: form.branch
      }}))
    }
  }

  useEffect(()=>{
    
    if(createState.branch_list.length === 0){
      const payload = Object.values(authState.roles).includes(7100 || 7000) ? {
        url: "systemUtils/nimcBranch",
        institution_id:profile?.institution.institution_data[0].id
      }:{
        url: "banks/getBranches",
        institution_id: profile?.institution?.bank_data[0].id
      }
      dispatch(getBankBranchThunk(payload))
    }
  },[])




  return <div id="myModal" className=" absolute w-full h-full bg-[rgba(0,0,0,0.4)] z-50 backdrop-blur-sm flex items-center justify-center">
    <div className="p-4 bg-white w-full max-w-[24rem] flex flex-col gap-3 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg ">Create New User</h1>
        <div className="p-3 cursor-pointer" onClick={() => {
          dispatch(resetForm())
          dispatch(updateState({
          key: "isModalOpen",
          value: false
        }))}}>
          <CloseBtn />
        </div>
      </div>
      <form onSubmit={submitCreationForm} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <CustomInputField label="First Name" onChange={updateRequestForm} value={form.first_name} name="first_name"/>
        <CustomInputField label="Last Name" onChange={updateRequestForm} value={form.last_name} name="last_name" />
      </div>
      <CustomInputField label="Email" type="email" onChange={updateRequestForm} value={form.email} name="email"/>

      <CustomInputField label="Phone Number" type="tel" onChange={updateRequestForm} value={form.phone_number} name="phone_number"/>
      <CustomInputField onChange={updateRequestForm} value={form.password} name="password" label="Password" />
      <div className="flex flex-col gap-3">
        <select name="roles" onChange={updateRequestForm} value={form.roles} className=" text-sm font-medium text-stone-700">
          <option value={100}>--- Select User Role ---</option>
          <option value={5100}>Admin</option>
          <option value={5000}>User</option>
        </select>
        <select name="branch" onChange={updateRequestForm} value={form.branch} className="text-sm font-medium text-stone-700">
          {
          createState.isLoadingBankBranches && createState.branch_list.length ===0 ? <option>Loading <FaSolidLoader /></option>
          :
          createState.branch_list.map(list=><option key={list.id} value={list.branch_code??list.id} >{list.branch_name}</option>)}
        </select>
      </div>

      <div className="flex gap-4 justify-end">
        <button 
          className="btn-custom outline-white disabled:bg-[#2baf50c7] min-w-[10em] grid place-content-center bg-[#2baf50] text-white font-bold py-2 px-5 rounded-md mt-4"
        >
          {createState.isLoading?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="4"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg> : "Create User"}
        </button>
      </div>
      </form>
    </div>

  </div>
}
export default CreateNewUserModal


// user_payload