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
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetForm, updateState } from './app/access_control/createNewUserSlice';
import { updateListModalState } from './app/card_listing/listingFilterSlice';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
  //   let localToken = localStorage.getItem("token")
  //   if(localToken && token.length<3){
  //     dispatch(updateTokenFromStorage(localToken))
  //   }
    window.onclick = function(event) {
      if (event.target.id === 'myModal') {
        dispatch(resetForm())
        dispatch(updateListModalState(false))
        dispatch(updateState({
          key:"isModalOpen",
          value: false
        }))
      }
    }
  },[])

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





  // return <div>
  //   {(token?<NewDashboard /> :<Login/>)}
  //   <ToastContainer />
  // </div>


}


export default App;
