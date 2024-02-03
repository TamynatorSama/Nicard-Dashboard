import { useDispatch, useSelector } from "react-redux"
import { updateTokenFromStorage } from "../../app/login/loginSlice"
import { profileData } from "../../app/appSlice"


const useAuth =()=> {
    const dispatch = useDispatch()
    const authState = useSelector(state=>state.authReducer)
    const profile = useSelector(profileData)
    let token = authState.token
    if(token.length ===0){
        let localToken = localStorage.getItem("token")
        if(localToken && token.length<3){
          dispatch(updateTokenFromStorage(localToken))
        } 
    };
    

    if(token.length ===0){
        return {
            token,
            isAuthenticated:false,
            roles: profile?.user_payload?.roles ??{}
        }
    }else{
        return {
            token,
            isAuthenticated:true,
            roles: profile?.user_payload?.roles ??{}
        }
    }

    
}
export default useAuth