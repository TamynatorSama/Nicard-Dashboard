import { useContext, useEffect } from "react";
import "../App.css";
import NavComponent from "../component/navComponent";
import { DataProvider } from "../App";
import emptyPng from "../assets/Empty-cuate.svg";
import { CardRequestStatusList } from "../utils/requestStatus";
import { Bounce, ToastContainer, toast } from "react-toastify";


const contactStyle = {
  "grid-column": "1/3",
};
const actionStyle = {
  "grid-column": "7/9",
};

const Dashboard = () => {
  const appState = useContext(DataProvider);
  const notifyError = (message) => toast.error(`${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });

  const handleAction = async (actionId,requestId) => {
  

    let formerStatus = {};
    appState.appDataModifier({
      userData: appState.appData.userData,
      vendorData: appState.appData.vendorData.map((val)=>{
        if(val.id === requestId){
          formerStatus = val.status
        return {...val,status: CardRequestStatusList.find(elem => elem.id === actionId) }
        }
        return val
      }),
    });
    
    var response = await fetch("http://localhost:5001/api/cards/updateCardRequest",{
      method:"PATCH",
      body:JSON.stringify({
        "status_id":actionId,
        "request_id": requestId
    }),
      headers:{
        authorization: `Bearer ${
          appState.appData.userData.user_info?.token ?? ""
        }`,
        "content-type":"application/json"
      }
    })

    var decodedResponse = await response.json()

    if(response.status !== 200){
      // notifyError(decodedResponse.message)
      // appState.appDataModifier({
      //   userData: appState.appData.userData,
      //   vendorData: appState.appData.vendorData.map((val)=>{
      //     if(val.id === requestId){
      //     return {...val,status: formerStatus }
      //     }
      //     return val
      //   }),
      // });
    }
  
  };

  useEffect(() => {
    getVendorData()
  }, []);
  var buildListing = appState.appData.vendorData.map((val) => {
    return (
      <div
        key={val.id}
        className="grid grid-cols-8 gap-7  grid-rows-1 bg-stone-200 px-4 py-2 rounded-sm items-center"
      >
        <div style={contactStyle}>
          <h1 className="text-md font-semibold w-full">
            {val.user_data[0].first_name + " " + val.user_data[0].last_name}
          </h1>
          <p className="text-[0.8em] font-medium text-stone-600 w-full">
            {val.user_data[0].phone_number}
          </p>
        </div>
        <p className="text-sm font-semibold">{val.nin}</p>
        <p className="text-sm font-semibold">
          {new Date("2024-01-25T11:27:47.137Z").toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="text-sm font-semibold">{val.request_status[0].request_status_slug}</p>
        <p className="text-sm font-semibold">{val.request_type[0].request_type_slug}</p>
        <div
          className="text-[0.8em] font-semibold flex justify-evenly"
          style={actionStyle}
        >
          <div onClick={()=>handleAction("9e51f0f4-b2ac-4d15-a591-90b099b5b85f",val.id)} className="action-item flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2m-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"
              />
            </svg>
            <span>Pending Review</span>
          </div>
          <div onClick={()=>handleAction("b863da42-7759-48e6-86a8-627180fc2f1b",val.id)} className="action-item flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="black"
                stroke-linecap="round"
                stroke-width="2"
                d="m5 14l3.233 2.425a1 1 0 0 0 1.374-.167L18 6"
              />
            </svg>
            <span>Approved</span>
          </div>

          <div onClick={()=>handleAction("08c6c435-ee79-471b-ac7b-58aa00e75338",val.id)} className="action-item flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"
              />
            </svg>
            <span>Processing</span>
          </div>

          <div onClick={()=>handleAction("e7342e0e-ebc2-4748-ab04-dc4813001cf1",val.id)} className="action-item flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  stroke="green"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m8 13l4.228 3.382a1 1 0 0 0 1.398-.148L22 6"
                />
                <path
                  fill="green"
                  fill-rule="evenodd"
                  d="m11.19 12.237l4.584-5.604a1 1 0 0 0-1.548-1.266l-4.573 5.59zm-3.167 3.87l-1.537-1.28l-.653.798L2.6 13.2a1 1 0 0 0-1.2 1.6l3.233 2.425a2 2 0 0 0 2.748-.334z"
                  clip-rule="evenodd"
                />
              </g>
            </svg>
            <span>Done</span>
          </div>

          <div onClick={()=>handleAction("f3ff9fe0-b7a1-4d83-8c23-95beb1b53787",val.id)} className="action-item flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"
              />
            </svg>
            <span>Decline</span>
          </div>
        </div>

        {/* end of header */}
      </div>
    );
  });

  function getVendorData(){
    fetch(
      "http://localhost:5001/api/cards/getVendorRequests/331efb57-75ca-4a00-9aba-92a48b5297ca",
      {
        headers: {
          authorization: `Bearer ${
            appState.appData.userData.user_info?.token ?? ""
          }`,
        },
      }
    )
      .then((res) => res.json())
      .then((val) => {
        if (val.result) {
          appState.appDataModifier({
            userData: appState.appData.userData,
            vendorData: val.result,
          });
        }
      });
  }

  return (
    <main className="w-full h-svh flex">
      <NavComponent />
      <div className="py-10 px-10 w-full flex flex-col h-full">
        <div className="flex justify-between items-center">
        <h1 className="text-4xl font-medium mt-2">Dashboard</h1>
        <p className="font-bold cursor-pointer select-none" onClick={getVendorData}>Refresh</p>
        </div>
        {buildListing.length === 0 ? (
          <div className="h-[90%] flex items-center justify-center flex-col">
            <img
              src={emptyPng}
              alt=""
              className=" w-[25em] h-[80%] opacity-90"
            />
            <h1 className="text-3xl font-semibold text-center text-stone-700 max-w-[20em]">
              No Card Request has been made to this Vendor account
            </h1>
          </div>
        ) : (
          <div className="flex flex-col gap-5 h-full">
            <div className="grid grid-cols-8 gap-7 mt-10 grid-rows-1 px-4">
              {/* header */}
              <p
                className="text-sm font-semibold text-[#208a3d]"
                style={contactStyle}
              >
                Contact Info
              </p>
              <p className="text-sm font-semibold">NIN</p>
              <p className="text-sm font-semibold">Request Date</p>
              <p className="text-sm font-semibold">Request Status</p>
              <p className="text-sm font-semibold">Request Type</p>
              <p className="text-sm font-semibold" style={actionStyle}>
                Actions
              </p>

              {/* end of header */}
            </div>
            {/* end of headers */}

            {buildListing}

            {/* <div className="grid grid-cols-8 gap-7  grid-rows-1 bg-stone-200 px-4 py-2 rounded-sm items-center">
            <div style={contactStyle}>
              <h1 className="text-md font-semibold w-full">
                Kolawole Tamilore
              </h1>
              <p className="text-[0.8em] font-medium text-stone-600 w-full">
                +2349063976031
              </p>
            </div>
            <p className="text-sm font-semibold">21223212323</p>
            <p className="text-sm font-semibold">21/1/2024</p>
            <p className="text-sm font-semibold">Pending</p>
            <p className="text-sm font-semibold">Card Request</p>
            <div className="text-[0.8em] font-semibold flex justify-evenly" style={actionStyle}>
              <div className="action-item flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2m-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"/></svg>
                <span>Pending Review</span>
              </div>
              <div className="action-item flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="black" stroke-linecap="round" stroke-width="2" d="m5 14l3.233 2.425a1 1 0 0 0 1.374-.167L18 6"/></svg>
                <span>Approved</span>
              </div>

              <div className="action-item flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="black" d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64z"/></svg>
                <span>Processing</span>
              </div>
              
              <div className="action-item flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path stroke="green" stroke-linecap="round" stroke-width="2" d="m8 13l4.228 3.382a1 1 0 0 0 1.398-.148L22 6"/><path fill="green" fill-rule="evenodd" d="m11.19 12.237l4.584-5.604a1 1 0 0 0-1.548-1.266l-4.573 5.59zm-3.167 3.87l-1.537-1.28l-.653.798L2.6 13.2a1 1 0 0 0-1.2 1.6l3.233 2.425a2 2 0 0 0 2.748-.334z" clip-rule="evenodd"/></g></svg>
                <span>Done</span>
              </div>

              <div className="action-item flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="red" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41"/></svg>
                <span>Decline</span>
              </div>
            </div>
          </div> */}
          </div>
        )}
      </div>
      {/* <div className="logo-grp flex flex-col items-left w-full ">
            <h1 className='text-4xl mt-6 ml-4'>Dashboard</h1>
            <div className='bg-gray-200 w-1/3 ml-4 mt-4 rounded-lg'>
                <div className="input-grp flex border-2 border-stone-200 p-2 rounded-lg w-full max-w-[30em]">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            className="stroke-stone-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-search"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>

                    <input
                        class="w-full outline-none ml-4 font-medium bg-transparent"
                        type="text"
                        name="search"
                        placeholder="Search by nin"
                    />
                </div>
            </div>
            <h1 className="text-2xl pl-10 font-bold mt-4 ">Card Requests</h1>
            <div className="w-full overflow-x-scroll no-bars ml-10 mt-4">
                <div className='grid grid-cols-7'>
                    <p>S/N</p>
                    <p>Contact Info</p>
                    <p>NIN</p>
                    <p>Request</p>
                    <p>Actions</p>
                </div>
            </div>
        </div> */}
        <ToastContainer />
    </main>
  );
};

export default Dashboard;
