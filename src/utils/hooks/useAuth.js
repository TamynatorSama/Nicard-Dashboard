import { useDispatch, useSelector } from "react-redux"
import { updateTokenFromStorage } from "../../app/login/loginSlice"


const useAuth =()=> {
    const dispatch = useDispatch()
    const authState = useSelector(state=>state.authReducer)
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
            isAuthenticated:false
        }
    }else{
        return {
            token,
            isAuthenticated:true
        }
    }

    
}
export default useAuth