import { useDispatch, useSelector } from "react-redux"
import { updateState } from "../app/access_control/createNewUserSlice"

const CreateNewUserModal=()=>{
    const modal = useSelector(state=>state.createUser)
    const dispatch = useDispatch()


    const changeModalState=(ev)=>{

    }


    return <div id="myModal" onClick={changeModalState} className=" absolute w-full h-full bg-[rgba(0,0,0,0.4)] z-50 backdrop-blur-sm flex items-center justify-center">
        <div className="p-10 bg-white"></div>
        
    </div>
}
export default CreateNewUserModal