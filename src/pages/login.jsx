import LogoLarge from "../assets/logo_large.svg";
import NewLogo from '../assets/newLogo.png'
import { useState } from "react";
import {ToastContainer} from 'react-toastify';
import {useLocation, useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../app/login/loginSlice";

  


const Login = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathName || "/"
  const loginState = useSelector(state=>state.authReducer)
  const dispatch = useDispatch()

  const [errors,setErrors] = useState({})
  

    const handleSubmit=async(ev)=>{
      if(loginState.isLoading) return;
      ev.preventDefault()
      
      let email = ev.target[0].value
      let password = ev.target[1].value


      dispatch(loginThunk({
        navigator:()=>{
          navigate(from,{replace:true})},
        data:{
        email,
          password
        }},
        ))
      if(loginState.token.length>4){
        
      }





    }


  // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



    const handleFormChange =(ev)=>{
      if(ev.target.name === "password"){
        if(ev.target.value.length<1){
          if(!errors["password"]){
            setErrors((error)=>{
              return {...error,password:["password field is required"]}
            })
          }
          setErrors((error)=>{
            return {...error,password:["password field is required"]}
          })

        }
        else{
          setErrors((error)=>{
            return {...error,password:[]}
        })
        }
      }
      if(ev.target.name === "email"){
        if(ev.target.value.length<1){
          if(!errors["email"]){
            setErrors((error)=>{
              return {...error,email:["email field is required"]}
            })
          }
          setErrors((error)=>{
            return {...error,email:["email field is required"]}
          })

        }
        else{
          setErrors((error)=>{
            return {...error,email:[]}
        })
        }
      }
    }
  return (
    <main className="h-screen w-full relative flex justify-center items-center flex-col">
      <div className="absolute bottom-0 right-0 h-3/4 select-none pointer-events-none">
        <img src={LogoLarge} className="h-full" alt="" />
      </div>
      <div className="flex justify-center items-center flex-col z-10">
        <img src={NewLogo} className="h-fit max-w-[5em] mb-3 object-cover" alt="eIDCard logo" />
        <h1 className="mb-5 text-3xl font-bold">eIDCard</h1>
        <div className="login-box w-full max-w-[25em] p-10 border-2 border-stone-200 rounded-2xl shadow-md bg-white">
          <h1 className="font-bold text-4xl ">Login</h1>
          <p className="text-stone-600 text-sm font-medium font-sans mt-1">
            Enter your credentials to access your dashboard
          </p>
          <form className="mt-8" method="POST" onChange={handleFormChange} onSubmit={handleSubmit}>
            <div className="input-grp flex border-2 border-stone-300 p-2 rounded-md">
              <div className="border-r-2 pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-stone-500 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                  />
                </svg>
              </div>

              <input
                class="w-full outline-none ml-4 font-semibold"
                type="email"
                name="email"
                required
                placeholder="Email"
              />
            </div>
            <p className="text-red-500 font-font-medium text-sm">{(errors.email?.length??0)>0?`${errors.email[0]}`:""}</p>

            <div className="input-grp flex border-2 p-2 rounded-md mt-4">
              <div className="border-r-2 pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-stone-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>

              <input
                class="w-full outline-none ml-4 font-semibold"
                type="password"
                name="password"
                required
                placeholder="password"
              />
              
            </div>
            <p className="text-red-500 font-font-medium text-sm">{(errors.password?.length??0)>0?`${errors.password[0]}`:""}</p>
            <button type="submit" className="outline-white w-full grid place-content-center bg-[#2baf50] text-white font-bold py-3 rounded-md mt-7">{loginState.isLoading?<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-width="4"><path stroke-dasharray="60" stroke-dashoffset="60" stroke-opacity=".3" d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.3s" values="60;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M12 3C16.9706 3 21 7.02944 21 12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="15;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g></svg>:"Login"}</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </main>
    
  );
};

export default Login;
