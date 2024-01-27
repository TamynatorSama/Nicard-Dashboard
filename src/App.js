import './App.css';
import Dashboard from './pages/dashboard';
import {Routes,Route, Outlet, Navigate,useLocation } from 'react-router-dom';
import Login from './pages/login';
import { createContext,useContext,useState } from "react"
import NewDashboard from './pages/dashboard/newDashboard';


export const DataProvider = createContext({})

function App() {
  const [appData,setAppData] = useState({
    userData: {},
    vendorData:[]
  })

  const appDataModifier =(newData)=>{
    console.log(newData)
    setAppData(newData)
  } 


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
  return (
    <DataProvider.Provider value={{appData,appDataModifier}}>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dash' element={<NewDashboard />} />
        <Route element={<RouteAuthenticator/>}>
          <Route path='/' element={<Dashboard/>} />
        </Route>
      </Routes>
    </DataProvider.Provider>

  )
}
const RouteAuthenticator =()=>{
  const appState = useContext(DataProvider)
  const location = useLocation()
  let token = appState.appData.userData?.user_info?.token
  return (token?<Outlet />:<Navigate to="/login" state={{from:location}} replace/>)
}

export default App;
