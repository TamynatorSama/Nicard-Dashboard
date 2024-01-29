import './App.css';
// import Dashboard from './pages/dashboard';
import {Route} from 'react-router-dom';
import Login from './pages/login';
import { createContext, useEffect} from "react"
import NewDashboard from './pages/dashboard/newDashboard';
import { useDispatch, useSelector } from 'react-redux';
import { updateTokenFromStorage } from './app/login/loginSlice';


export const DataProvider = createContext({})

function App() {
  // const [appData,setAppData] = useState({
  //   userData: {},
  //   vendorData:[]
  // })
  const authState = useSelector(state=>state.authReducer)

  let token = authState.token
const dispatch = useDispatch()


  useEffect(()=>{
    let localToken = localStorage.getItem("token")
    if(localToken && token.length<3){
      dispatch(updateTokenFromStorage(localToken))
    }
  },[token,dispatch])

  // const appDataModifier =(newData)=>{
  //   console.log(newData)
  //   setAppData(newData)
  // } 


  // const router = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <Login />,
  //     // errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/",
  //     element: <Dashboard />,
  //     // errorElement: <ErrorPage />,
  //   },
  // ]);

    return (token?<NewDashboard /> :<Login/>)
      // <Routes>
      //   <Route path='/login' element={<Login/>}/>
        
      //   <Route element={<RouteAuthenticator/>}>
      //   <Route path='/' element={<NewDashboard />} />
      //     {/* <Route path='/' element={<Dashboard/>} /> */}
      //   </Route>
      // </Routes>


}
// const RouteAuthenticator =()=>{
//   const location = useLocation()
  // const authState = useSelector(state=>state.authReducer)

  // let token = authState.token
//   return (token?<Outlet />:<Navigate to="/login" state={{from:location}} replace/>)
// }

export default App;
