import './App.css';
import Login from './pages/login';
import NewDashboard from './pages/dashboard/newDashboard';
import { Route, Routes } from 'react-router-dom';
import CardListingPage from './pages/card_listing';
import CardRequestPage from './pages/card_request';
import CardRenewPage from './pages/card_renew';
import CardReplacementPage from './pages/card_replace';
import CardBlockPage from './pages/card_block';
import AccessControlPage from './pages/access_control';

function App() {

  // const authState = useSelector(state=>state.authReducer)

  // let token = authState.token
  // const dispatch = useDispatch()

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<NewDashboard />}>
        <Route index element={<CardListingPage />} />
        <Route path='requestCard' element={<CardRequestPage />} />
        <Route path='renewCard' element={<CardRenewPage />} />
        <Route path='renewCard' element={<CardReplacementPage />} />
        <Route path='replaceCard' element={<CardReplacementPage />} />
        <Route path='blockCard' element={<CardBlockPage />} />
        <Route path='accessControl' element={<AccessControlPage />} />
      </Route>
    </Routes>
  )


  // useEffect(()=>{
  //   let localToken = localStorage.getItem("token")
  //   if(localToken && token.length<3){
  //     dispatch(updateTokenFromStorage(localToken))
  //   }
  //   window.onclick = function(event) {
  //     if (event.target.id === 'myModal') {
  //       dispatch(updateState({
  //         key:"isModalOpen",
  //         value: false
  //       }))
  //     }
  //   }
  // },[dispatch])


  // return <div>
  //   {(token?<NewDashboard /> :<Login/>)}
  //   <ToastContainer />
  // </div>


}


export default App;
