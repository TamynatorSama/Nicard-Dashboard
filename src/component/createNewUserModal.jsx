import { useDispatch } from "react-redux"
import { updateState } from "../app/access_control/createNewUserSlice"
import CustomInputField from "./customInputField"
import { CloseBtn } from "./icons"
import { NewDropDown } from "./customDropdown"

const CreateNewUserModal=()=>{
    // const modal = useSelector(state=>state.createUser)
    const dispatch = useDispatch()


    return <div id="myModal"  className=" absolute w-full h-full bg-[rgba(0,0,0,0.4)] z-50 backdrop-blur-sm flex items-center justify-center">
        <div className="p-4 bg-white w-full max-w-[24rem] flex flex-col gap-3 rounded-md">
            <div className="flex justify-between items-center">
            <h1 className="text-lg ">Create New User</h1>
            <div className="p-3 cursor-pointer" onClick={()=>dispatch(updateState({
          key:"isModalOpen",
          value: false
        }))}>
                <CloseBtn />
            </div>
            </div>
            <div className="flex gap-2">
            <CustomInputField label="First Name" />
            <CustomInputField label="Last Name" />
            </div>
            <CustomInputField label="Email" />
            
            <CustomInputField label="Phone Number" />
            <CustomInputField label="Password" />
            <div className="flex gap-4 justify-end">
            <button
        //   
          className="btn-custom outline-white disabled:bg-[#2baf50c7] grid place-content-center bg-[#2baf50] text-white font-bold py-2 px-5 rounded-md mt-4"
        >


         
          Create User
          </button>
            </div>
        </div>
        
    </div>
}
export default CreateNewUserModal